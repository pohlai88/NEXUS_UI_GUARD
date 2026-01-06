/**
 * nx-generate.ts — Constitutional Generator
 *
 * @derived-from ui/canonical.ts
 * @package nexus-kernel
 *
 * Behavior:
 * - Reads exports from canonical.ts
 * - Injects content between explicit markers in input.css
 * - Fails loudly if markers are missing (exit 1)
 * - Never touches content outside markers
 * - Deterministic and idempotent
 *
 * Usage: pnpm nx:generate
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
  generator: (data: Record<string, unknown>, prefix: string) => string[];
}

const MARKER_SECTIONS: MarkerSection[] = [
  {
    name: "COLOR_PRIMITIVES",
    canonicalKey: "NX_COLOR_PRIMITIVES",
    cssPrefix: "--nx-",
    generator: generateColorPrimitives,
  },
  {
    name: "SEMANTICS",
    canonicalKey: "NX_SEMANTICS",
    cssPrefix: "--color-nx-",
    generator: generateFlatTokens,
  },
  {
    name: "TYPOGRAPHY",
    canonicalKey: "NX_TYPOGRAPHY",
    cssPrefix: "--nx-",
    generator: generateFlatTokens,
  },
  {
    name: "SPACING",
    canonicalKey: "NX_SPACING",
    cssPrefix: "--nx-space-",
    generator: generateFlatTokens,
  },
  {
    name: "SPACING_SEMANTIC",
    canonicalKey: "NX_SPACING_SEMANTIC",
    cssPrefix: "--nx-space-",
    generator: generateFlatTokens,
  },
  {
    name: "SIZING",
    canonicalKey: "NX_SIZING",
    cssPrefix: "--nx-",
    generator: generateFlatTokens,
  },
  {
    name: "RADIUS",
    canonicalKey: "NX_RADIUS",
    cssPrefix: "--nx-radius-",
    generator: generateFlatTokens,
  },
  {
    name: "BORDER",
    canonicalKey: "NX_BORDER",
    cssPrefix: "--nx-border-",
    generator: generateFlatTokens,
  },
  {
    name: "SHADOW",
    canonicalKey: "NX_SHADOW",
    cssPrefix: "--nx-shadow-",
    generator: generateFlatTokens,
  },
  {
    name: "ZINDEX",
    canonicalKey: "NX_ZINDEX",
    cssPrefix: "--nx-z-",
    generator: generateFlatTokens,
  },
  {
    name: "MOTION",
    canonicalKey: "NX_MOTION",
    cssPrefix: "--nx-",
    generator: generateFlatTokens,
  },
  {
    name: "BREAKPOINTS",
    canonicalKey: "NX_BREAKPOINTS",
    cssPrefix: "--nx-bp-",
    generator: generateFlatTokens,
  },
];

/* ============================================================
 * Canonical Data Type
 * ============================================================ */

interface CanonicalData {
  NX_VERSION: string;
  NX_COLOR_PRIMITIVES: Record<string, Record<number, string>>;
  NX_SRGB_FALLBACKS: Record<string, string>;
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
  FORBIDDEN_PATTERNS: readonly string[];
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
 * Token Generators
 * ============================================================ */

function generateColorPrimitives(
  data: Record<string, Record<number, string>>,
  prefix: string
): string[] {
  const lines: string[] = [];
  const sortedScales = Object.keys(data).sort();

  for (const scale of sortedScales) {
    const steps = data[scale];
    const sortedSteps = Object.keys(steps)
      .map(Number)
      .sort((a, b) => a - b);

    for (const step of sortedSteps) {
      lines.push(`${prefix}${scale}-${step}: ${steps[step]};`);
    }
  }

  return lines;
}

function generateFlatTokens(
  data: Record<string, string>,
  prefix: string
): string[] {
  const lines: string[] = [];
  const sortedKeys = Object.keys(data).sort((a, b) => {
    // Numeric keys sort numerically
    const aNum = Number(a);
    const bNum = Number(b);
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }
    // String keys sort alphabetically
    return a.localeCompare(b);
  });

  for (const key of sortedKeys) {
    lines.push(`${prefix}${key}: ${data[key]};`);
  }

  return lines;
}

/* ============================================================
 * Marker Content Replacement
 * ============================================================ */

function replaceMarkerContent(
  css: string,
  markerName: string,
  content: string
): { result: string; found: boolean } {
  const startMarker = `/* NX:${markerName}:START */`;
  const endMarker = `/* NX:${markerName}:END */`;

  const startIdx = css.indexOf(startMarker);
  const endIdx = css.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    return { result: css, found: false };
  }

  if (endIdx <= startIdx) {
    console.error(`❌ Invalid marker order: ${markerName}`);
    process.exit(1);
  }

  // Check for duplicates
  if (css.indexOf(startMarker, startIdx + 1) !== -1) {
    console.error(`❌ Duplicate marker: ${markerName}`);
    process.exit(1);
  }

  const before = css.substring(0, startIdx + startMarker.length);
  const after = css.substring(endIdx);

  return {
    result: before + "\n" + content + "\n  " + after,
    found: true,
  };
}

/* ============================================================
 * Format Generated Block
 * ============================================================ */

function formatBlock(
  sectionName: string,
  hash: string,
  tokens: string[]
): string {
  const lines = [
    `  /* AUTO-GENERATED FROM ui/canonical.ts — DO NOT EDIT */`,
    `  /* HASH: ${hash} */`,
    ...tokens.map((t) => `  ${t}`),
  ];

  return lines.join("\n");
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
    // Convert Windows path to file:// URL for ESM import
    const canonicalUrl = pathToFileURL(CANONICAL_PATH).href;
    const canonical = await import(canonicalUrl);

    // Verify required exports
    const requiredExports = [
      "NX_VERSION",
      "NX_COLOR_PRIMITIVES",
      "NX_SEMANTICS",
      "NX_TYPOGRAPHY",
      "NX_SPACING",
      "NX_SPACING_SEMANTIC",
      "NX_SIZING",
      "NX_RADIUS",
      "NX_BORDER",
      "NX_SHADOW",
      "NX_ZINDEX",
      "NX_MOTION",
      "NX_BREAKPOINTS",
    ];

    for (const exp of requiredExports) {
      if (!(exp in canonical)) {
        console.error(`❌ Missing export: ${exp}`);
        process.exit(1);
      }
    }

    return canonical as CanonicalData;
  } catch (err) {
    console.error(`❌ Failed to parse ui/canonical.ts:`, err);
    process.exit(1);
  }
}

/* ============================================================
 * Main Generator Function
 * ============================================================ */

async function main(): Promise<void> {
  console.log("🔧 nx-generate: Starting constitutional generation...\n");

  // 1. Load canonical
  const canonical = await loadCanonical();
  console.log(`   NX_VERSION: ${canonical.NX_VERSION}`);

  // 2. Read input.css
  if (!fs.existsSync(INPUT_CSS_PATH)) {
    console.error(`❌ Cannot find ui/input.css`);
    process.exit(1);
  }

  let css = fs.readFileSync(INPUT_CSS_PATH, "utf-8");

  // 3. Process each section
  const processedSections: string[] = [];

  for (const section of MARKER_SECTIONS) {
    const data = canonical[section.canonicalKey as keyof CanonicalData];
    if (!data) {
      console.error(`❌ Missing canonical data for: ${section.canonicalKey}`);
      process.exit(1);
    }

    const tokens = section.generator(
      data as Record<string, unknown>,
      section.cssPrefix
    );
    const hash = computeHash(JSON.stringify(data));
    const content = formatBlock(section.name, hash, tokens);

    const { result, found } = replaceMarkerContent(css, section.name, content);

    if (!found) {
      console.error(`❌ Missing marker: /* NX:${section.name}:START */`);
      process.exit(1);
    }

    css = result;
    processedSections.push(section.name);
    console.log(`   ✓ ${section.name} (${tokens.length} tokens)`);
  }

  // 4. Write output atomically
  try {
    fs.writeFileSync(INPUT_CSS_PATH, css, "utf-8");
  } catch (err) {
    console.error(`❌ Failed to write ui/input.css:`, err);
    process.exit(1);
  }

  // 5. Success
  console.log(`\n✅ nx-generate complete (NX_VERSION: ${canonical.NX_VERSION})`);
  console.log(`   Sections: ${processedSections.join(", ")}`);

  process.exit(0);
}

/* ============================================================
 * Execution
 * ============================================================ */

main();
