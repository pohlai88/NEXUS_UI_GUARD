/**
 * nx-validate.ts — Constitutional Validator (Read-Only)
 *
 * @derived-from ui/canonical.ts
 * @package nexus-kernel
 *
 * Behavior:
 * - Reads exports from canonical.ts
 * - Computes expected hashes for each section
 * - Compares against actual hashes in input.css
 * - Reports drift if hashes mismatch
 * - READ-ONLY: Does NOT modify any files
 * - Exit 1 on any drift (for CI enforcement)
 *
 * Usage: pnpm nx:validate
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { pathToFileURL } from "node:url";

/* ============================================================
 * Constants
 * ============================================================ */

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const CANONICAL_PATH = path.join(PROJECT_ROOT, "ui", "canonical.ts");
const INPUT_CSS_PATH = path.join(PROJECT_ROOT, "ui", "input.css");

/* ============================================================
 * Marker Section Definitions
 * ============================================================ */

interface MarkerSection {
  name: string;
  canonicalKey: string;
  cssPrefix: string;
}

const MARKER_SECTIONS: MarkerSection[] = [
  { name: "COLOR_PRIMITIVES", canonicalKey: "NX_COLOR_PRIMITIVES", cssPrefix: "--nx-" },
  { name: "SEMANTICS", canonicalKey: "NX_SEMANTICS", cssPrefix: "--color-nx-" },
  { name: "TYPOGRAPHY", canonicalKey: "NX_TYPOGRAPHY", cssPrefix: "--nx-" },
  { name: "SPACING", canonicalKey: "NX_SPACING", cssPrefix: "--nx-space-" },
  { name: "SPACING_SEMANTIC", canonicalKey: "NX_SPACING_SEMANTIC", cssPrefix: "--nx-space-" },
  { name: "SIZING", canonicalKey: "NX_SIZING", cssPrefix: "--nx-" },
  { name: "RADIUS", canonicalKey: "NX_RADIUS", cssPrefix: "--nx-radius-" },
  { name: "BORDER", canonicalKey: "NX_BORDER", cssPrefix: "--nx-border-" },
  { name: "SHADOW", canonicalKey: "NX_SHADOW", cssPrefix: "--nx-shadow-" },
  { name: "ZINDEX", canonicalKey: "NX_ZINDEX", cssPrefix: "--nx-z-" },
  { name: "MOTION", canonicalKey: "NX_MOTION", cssPrefix: "--nx-" },
  { name: "BREAKPOINTS", canonicalKey: "NX_BREAKPOINTS", cssPrefix: "--nx-bp-" },
];

/* ============================================================
 * Canonical Data Type
 * ============================================================ */

interface CanonicalData {
  NX_VERSION: string;
  NX_COLOR_PRIMITIVES: Record<string, Record<number, string>>;
  NX_SEMANTICS: Record<string, string>;
  NX_TYPOGRAPHY: Record<string, string>;
  NX_SPACING: Record<string, string>;
  NX_SPACING_SEMANTIC: Record<string, string>;
  NX_SIZING: Record<string, string>;
  NX_RADIUS: Record<string, string>;
  NX_BORDER: Record<string, string>;
  NX_SHADOW: Record<string, string>;
  NX_ZINDEX: Record<string, string>;
  NX_MOTION: Record<string, string>;
  NX_BREAKPOINTS: Record<string, string>;
}

/* ============================================================
 * Hash Computation
 * ============================================================ */

function computeHash(data: string): string {
  return (
    "sha256-" +
    crypto.createHash("sha256").update(data).digest("hex").slice(0, 12)
  );
}

/* ============================================================
 * Extract Hash from CSS
 * ============================================================ */

function extractHashFromCSS(css: string, markerName: string): string | null {
  const startMarker = `/* NX:${markerName}:START */`;
  const endMarker = `/* NX:${markerName}:END */`;

  const startIdx = css.indexOf(startMarker);
  const endIdx = css.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    return null;
  }

  const content = css.substring(startIdx + startMarker.length, endIdx);
  const hashMatch = content.match(/\/\* HASH: (sha256-[a-f0-9]+) \*\//);
  
  return hashMatch ? hashMatch[1] : null;
}

/* ============================================================
 * Load Canonical
 * ============================================================ */

async function loadCanonical(): Promise<CanonicalData> {
  if (!fs.existsSync(CANONICAL_PATH)) {
    console.error(`❌ Cannot find ui/canonical.ts`);
    process.exit(1);
  }

  try {
    const canonicalUrl = pathToFileURL(CANONICAL_PATH).href;
    const canonical = await import(canonicalUrl);
    return canonical as CanonicalData;
  } catch (err) {
    console.error(`❌ Failed to parse ui/canonical.ts: ${err}`);
    process.exit(1);
  }
}

/* ============================================================
 * Main
 * ============================================================ */

async function main(): Promise<void> {
  console.log("\n🔍 nx-validate: Starting constitutional validation...\n");

  // Load canonical data
  const canonical = await loadCanonical();
  console.log(`   NX_VERSION: ${canonical.NX_VERSION}`);

  // Read input.css
  if (!fs.existsSync(INPUT_CSS_PATH)) {
    console.error(`❌ Cannot find ui/input.css`);
    process.exit(1);
  }

  const cssContent = fs.readFileSync(INPUT_CSS_PATH, "utf-8");

  let driftCount = 0;
  const results: { section: string; status: "ok" | "drift" | "missing"; expected?: string; actual?: string }[] = [];

  // Validate each section
  for (const section of MARKER_SECTIONS) {
    const canonicalData = canonical[section.canonicalKey as keyof CanonicalData];
    if (!canonicalData) {
      console.error(`❌ Missing canonical data: ${section.canonicalKey}`);
      process.exit(1);
    }

    // Compute expected hash from canonical data (matches nx-generate.ts)
    const expectedHash = computeHash(JSON.stringify(canonicalData));
    const actualHash = extractHashFromCSS(cssContent, section.name);

    if (actualHash === null) {
      results.push({ section: section.name, status: "missing" });
      driftCount++;
      console.log(`   ❌ ${section.name}: MISSING MARKER`);
    } else if (actualHash !== expectedHash) {
      results.push({
        section: section.name,
        status: "drift",
        expected: expectedHash,
        actual: actualHash,
      });
      driftCount++;
      console.log(`   ❌ ${section.name}: DRIFT DETECTED`);
      console.log(`      Expected: ${expectedHash}`);
      console.log(`      Actual:   ${actualHash}`);
    } else {
      results.push({ section: section.name, status: "ok" });
      console.log(`   ✓ ${section.name} (${actualHash})`);
    }
  }

  console.log("");

  if (driftCount > 0) {
    console.log(`\n❌ DRIFT DETECTED: ${driftCount} section(s) out of sync`);
    console.log(`   Run 'pnpm nx:generate' to synchronize\n`);
    process.exit(1);
  }

  console.log(`\n✅ nx-validate complete: All ${MARKER_SECTIONS.length} sections in sync\n`);
}

main().catch((err) => {
  console.error(`❌ Unexpected error: ${err}`);
  process.exit(1);
});
