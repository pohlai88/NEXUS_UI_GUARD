/**
 * nx-check.ts — Constitutional Compliance Scanner
 *
 * @derived-from ui/canonical.ts (FORBIDDEN_PATTERNS)
 * @package nexus-kernel
 *
 * Behavior:
 * - Loads FORBIDDEN_PATTERNS from canonical.ts
 * - Scans all .tsx, .ts, .css files in portal/ and ui/
 * - Reports violations with file:line references
 * - Exit 1 on any violations (for CI enforcement)
 *
 * Usage: pnpm nx:check
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

/* ============================================================
 * Constants
 * ============================================================ */

// Detect if running from node_modules (consumer repo) or directly
const SCRIPT_DIR = import.meta.dirname;
const IS_IN_NODE_MODULES = SCRIPT_DIR.includes("node_modules");
const PROJECT_ROOT = IS_IN_NODE_MODULES
  ? path.resolve(SCRIPT_DIR, "..", "..", "..", "..")  // node_modules/@nexus/ui-guard/scripts -> project root
  : path.resolve(SCRIPT_DIR, "..");                    // scripts -> project root

// Canonical always comes from the package
const PACKAGE_ROOT = IS_IN_NODE_MODULES
  ? path.resolve(SCRIPT_DIR, "..")
  : path.resolve(SCRIPT_DIR, "..");
const CANONICAL_PATH = path.join(PACKAGE_ROOT, "ui", "canonical.ts");

// Directories to scan for compliance
const SCAN_DIRS = [
  path.join(PROJECT_ROOT, "apps", "portal"),
  path.join(PROJECT_ROOT, "ui"),
  path.join(PROJECT_ROOT, "packages"),
];

// File extensions to check
const FILE_EXTENSIONS = [".tsx", ".ts", ".css", ".jsx", ".js"];

// Files/directories to skip
const SKIP_PATTERNS = [
  "node_modules",
  ".next",
  "dist",
  "coverage",
  ".turbo",
  "canonical.ts", // Don't flag the canonical file itself
  "nx-check.ts", // Don't flag this file
  "nx-generate.ts", // Don't flag the generator
  "nx-validate.ts", // Don't flag the validator
  "nx-migrate-map.ts", // Don't flag the migration map (contains legacy patterns as data)
  "style.css", // Don't flag generated CSS output
];

/* ============================================================
 * Types
 * ============================================================ */

interface CanonicalData {
  FORBIDDEN_PATTERNS: readonly string[];
}

interface Violation {
  file: string;
  line: number;
  pattern: string;
  content: string;
}

/* ============================================================
 * File Walking
 * ============================================================ */

function* walkFiles(dir: string): Generator<string> {
  if (!fs.existsSync(dir)) {
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip excluded patterns
    if (SKIP_PATTERNS.some((skip) => fullPath.includes(skip))) {
      continue;
    }

    if (entry.isDirectory()) {
      yield* walkFiles(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (FILE_EXTENSIONS.includes(ext)) {
        yield fullPath;
      }
    }
  }
}

/* ============================================================
 * Pattern Scanning
 * ============================================================ */

function scanFileForViolations(
  filePath: string,
  patterns: readonly string[]
): Violation[] {
  const violations: Violation[] = [];
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    for (const pattern of patterns) {
      // Handle glob-style patterns
      let regex: RegExp;
      if (pattern.includes("*")) {
        // Convert glob to regex: bg-blue-* → bg-blue-\d+
        const escaped = pattern
          .replace(/[.+^${}()|[\]\\]/g, "\\$&")
          .replace(/\*/g, "\\S*");
        regex = new RegExp(`\\b${escaped}\\b`, "g");
      } else {
        // Simple substring match (case-insensitive for some patterns)
        regex = new RegExp(`\\b${pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      }

      if (regex.test(line)) {
        violations.push({
          file: filePath,
          line: lineNumber,
          pattern,
          content: line.trim().substring(0, 80),
        });
      }
    }
  }

  return violations;
}

/* ============================================================
 * Load Canonical
 * ============================================================ */

async function loadForbiddenPatterns(): Promise<readonly string[]> {
  if (!fs.existsSync(CANONICAL_PATH)) {
    console.error(`❌ Cannot find ui/canonical.ts`);
    process.exit(1);
  }

  try {
    const canonicalUrl = pathToFileURL(CANONICAL_PATH).href;
    const canonical = (await import(canonicalUrl)) as CanonicalData;

    if (!canonical.FORBIDDEN_PATTERNS) {
      console.error(`❌ Missing FORBIDDEN_PATTERNS in canonical.ts`);
      process.exit(1);
    }

    return canonical.FORBIDDEN_PATTERNS;
  } catch (err) {
    console.error(`❌ Failed to parse ui/canonical.ts: ${err}`);
    process.exit(1);
  }
}

/* ============================================================
 * Format Output
 * ============================================================ */

function formatViolations(violations: Violation[]): void {
  // Group by file
  const grouped = new Map<string, Violation[]>();

  for (const v of violations) {
    const existing = grouped.get(v.file) || [];
    existing.push(v);
    grouped.set(v.file, existing);
  }

  // Output by file
  for (const [file, fileViolations] of grouped) {
    const relativePath = path.relative(PROJECT_ROOT, file);
    console.log(`\n   📄 ${relativePath}`);

    for (const v of fileViolations) {
      console.log(`      L${v.line}: [${v.pattern}] ${v.content}`);
    }
  }
}

/* ============================================================
 * Main
 * ============================================================ */

async function main(): Promise<void> {
  console.log("\n🔍 nx-check: Scanning for constitutional violations...\n");

  // Load forbidden patterns
  const patterns = await loadForbiddenPatterns();
  console.log(`   Loaded ${patterns.length} forbidden patterns`);

  // Collect all files
  const allFiles: string[] = [];
  for (const dir of SCAN_DIRS) {
    for (const file of walkFiles(dir)) {
      allFiles.push(file);
    }
  }

  console.log(`   Scanning ${allFiles.length} files...`);

  // Scan for violations
  const allViolations: Violation[] = [];

  for (const file of allFiles) {
    const violations = scanFileForViolations(file, patterns);
    allViolations.push(...violations);
  }

  // Report results
  if (allViolations.length > 0) {
    console.log(`\n❌ CONSTITUTIONAL VIOLATIONS DETECTED: ${allViolations.length}`);
    formatViolations(allViolations);
    console.log(`\n   Fix violations and run 'pnpm nx:check' again\n`);
    process.exit(1);
  }

  console.log(`\n✅ nx-check complete: No violations found in ${allFiles.length} files\n`);
}

main().catch((err) => {
  console.error(`❌ Unexpected error: ${err}`);
  process.exit(1);
});
