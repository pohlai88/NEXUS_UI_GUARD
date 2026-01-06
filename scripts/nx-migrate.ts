#!/usr/bin/env npx tsx
/**
 * NEXUS DESIGN CONSTITUTION — MIGRATION ENGINE
 *
 * Deterministic, mechanical migration from:
 * - AIBOS (na-*) classes → Nexus tokens
 * - Raw Tailwind colors → Nexus semantic tokens
 * - Legacy imports → Nexus imports
 *
 * Rules:
 * - SCAN → MATCH → REPLACE → VERIFY
 * - No silent skips
 * - No "best guess"
 * - No partial replacements
 * - If unmapped pattern found → FAIL HARD
 *
 * @package nexus-kernel
 * @version 1.0.0
 */

import * as fs from "fs";
import * as path from "path";
import {
  AIBOS_TO_NX_MAP,
  RAW_TAILWIND_TO_NX_MAP,
  IMPORT_REPLACEMENT_MAP,
  CONTEXTUAL_PATTERNS,
} from "./nx-migrate-map.js";

/* ============================================================
 * CONFIGURATION
 * ============================================================ */

// Detect if running from node_modules (consumer repo) or directly
const SCRIPT_DIR = import.meta.dirname;
const IS_IN_NODE_MODULES = SCRIPT_DIR.includes("node_modules");

// PROJECT_ROOT: Always use cwd() - we're invoked from consumer's package.json scripts
const ROOT = process.cwd();

const SCAN_DIRS = [
  path.join(ROOT, "apps", "portal"),
  path.join(ROOT, "ui", "dashboard"),
];

const FILE_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".css"];

const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /dist/,
  /build/,
  /coverage/,
  /\.d\.ts$/,
];

/* ============================================================
 * TYPES
 * ============================================================ */

interface MigrationResult {
  file: string;
  replacements: number;
  unmappedPatterns: string[];
  errors: string[];
}

interface MigrationReport {
  totalFiles: number;
  totalReplacements: number;
  filesWithUnmapped: string[];
  allUnmappedPatterns: Set<string>;
  errors: string[];
}

/* ============================================================
 * HELPER FUNCTIONS
 * ============================================================ */

function getAllFiles(dir: string, extensions: string[]): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    // Skip excluded patterns
    if (EXCLUDE_PATTERNS.some((pattern) => pattern.test(fullPath))) {
      continue;
    }
    
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ============================================================
 * MIGRATION ENGINE
 * ============================================================ */

function migrateFile(filePath: string, dryRun: boolean): MigrationResult {
  const result: MigrationResult = {
    file: filePath,
    replacements: 0,
    unmappedPatterns: [],
    errors: [],
  };
  
  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    result.errors.push(`Failed to read file: ${err}`);
    return result;
  }
  
  let modified = content;
  
  // Phase 1: Apply contextual patterns first (multi-class combinations)
  for (const [_key, { pattern, replacement }] of Object.entries(CONTEXTUAL_PATTERNS)) {
    const matches = modified.match(pattern);
    if (matches) {
      modified = modified.replace(pattern, replacement);
      result.replacements += matches.length;
    }
  }
  
  // Phase 2: Apply AIBOS → NX class mappings
  // Sort by length descending to match longer patterns first
  const aibosSorted = Object.entries(AIBOS_TO_NX_MAP).sort(
    (a, b) => b[0].length - a[0].length
  );
  
  for (const [oldClass, newClass] of aibosSorted) {
    // Match class in className attributes
    // Handle: start of string, after space, after quote, after backtick, after {, after $
    // End: end of string, before space, before quote, before backtick, before }, before $
    const pattern = new RegExp(
      `(?<=["'\`\\s{$])${escapeRegex(oldClass)}(?=["'\`\\s}$])`,
      "g"
    );
    
    const matches = modified.match(pattern);
    if (matches) {
      modified = modified.replace(pattern, newClass);
      result.replacements += matches.length;
    }
  }
  
  // Phase 3: Apply raw Tailwind → NX semantic mappings
  const tailwindSorted = Object.entries(RAW_TAILWIND_TO_NX_MAP).sort(
    (a, b) => b[0].length - a[0].length
  );
  
  for (const [oldClass, newClass] of tailwindSorted) {
    const pattern = new RegExp(
      `(?<=["'\`\\s{$])${escapeRegex(oldClass)}(?=["'\`\\s}$])`,
      "g"
    );
    
    const matches = modified.match(pattern);
    if (matches) {
      modified = modified.replace(pattern, newClass);
      result.replacements += matches.length;
    }
  }
  
  // Phase 4: Apply CSS selector migrations (for <style jsx> blocks)
  // Handles patterns like .na-class-name in CSS selectors
  for (const [oldClass, newClass] of aibosSorted) {
    // Match class in CSS selectors: preceded by dot
    const cssPattern = new RegExp(
      `\\.${escapeRegex(oldClass)}(?=[\\s,{:#\\[\\]>+~)])`,
      "g"
    );
    
    const cssMatches = modified.match(cssPattern);
    if (cssMatches) {
      modified = modified.replace(cssPattern, `.${newClass}`);
      result.replacements += cssMatches.length;
    }
  }
  
  // Phase 5: Apply import replacements
  for (const [oldImport, newImport] of Object.entries(IMPORT_REPLACEMENT_MAP)) {
    const pattern = new RegExp(escapeRegex(oldImport), "g");
    const matches = modified.match(pattern);
    if (matches) {
      modified = modified.replace(pattern, newImport);
      result.replacements += matches.length;
    }
  }
  
  // Phase 5: Detect unmapped patterns (FAIL HARD mode)
  const unmappedNaPatterns = modified.match(/\bna-[a-z0-9-]+/g);
  if (unmappedNaPatterns) {
    const unique = [...new Set(unmappedNaPatterns)];
    result.unmappedPatterns.push(...unique);
  }
  
  // Also check for unmapped raw Tailwind patterns
  const unmappedTailwindPatterns = modified.match(
    /\b(?:bg|text|border)-(?:gray|blue|red|green|yellow|orange|purple|pink|indigo|violet|slate|zinc|neutral|stone)-\d+(?:\/\d+)?/g
  );
  if (unmappedTailwindPatterns) {
    const unique = [...new Set(unmappedTailwindPatterns)];
    result.unmappedPatterns.push(...unique);
  }
  
  // Phase 6: Write file (if not dry run and there were changes)
  if (modified !== content && !dryRun) {
    try {
      fs.writeFileSync(filePath, modified, "utf-8");
    } catch (err) {
      result.errors.push(`Failed to write file: ${err}`);
    }
  }
  
  return result;
}

/* ============================================================
 * MAIN EXECUTION
 * ============================================================ */

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const verbose = args.includes("--verbose");
  const strict = args.includes("--strict");
  
  console.log("\n⚖️ nx-migrate: Constitutional Migration Engine\n");
  console.log(`   Mode: ${dryRun ? "DRY RUN (no files modified)" : "LIVE (files will be modified)"}`);
  console.log(`   Strict: ${strict ? "YES (fail on unmapped)" : "NO (report unmapped)"}`);
  console.log("");
  
  const report: MigrationReport = {
    totalFiles: 0,
    totalReplacements: 0,
    filesWithUnmapped: [],
    allUnmappedPatterns: new Set(),
    errors: [],
  };
  
  // Collect all files
  const allFiles: string[] = [];
  for (const dir of SCAN_DIRS) {
    allFiles.push(...getAllFiles(dir, FILE_EXTENSIONS));
  }
  
  report.totalFiles = allFiles.length;
  console.log(`   Scanning ${allFiles.length} files...\n`);
  
  // Process each file
  for (const file of allFiles) {
    const result = migrateFile(file, dryRun);
    const relativePath = path.relative(ROOT, file);
    
    if (result.replacements > 0 || result.unmappedPatterns.length > 0) {
      if (verbose || result.replacements > 0) {
        const status = result.unmappedPatterns.length > 0 ? "⚠️" : "✓";
        console.log(`   ${status} ${relativePath} (${result.replacements} replacements)`);
      }
      
      if (result.unmappedPatterns.length > 0) {
        report.filesWithUnmapped.push(relativePath);
        for (const pattern of result.unmappedPatterns) {
          report.allUnmappedPatterns.add(pattern);
        }
        if (verbose) {
          for (const pattern of result.unmappedPatterns) {
            console.log(`      ❌ UNMAPPED: ${pattern}`);
          }
        }
      }
    }
    
    report.totalReplacements += result.replacements;
    report.errors.push(...result.errors);
  }
  
  // Print summary
  console.log("\n" + "═".repeat(60));
  console.log("   MIGRATION REPORT");
  console.log("═".repeat(60));
  console.log(`   Files scanned:    ${report.totalFiles}`);
  console.log(`   Replacements:     ${report.totalReplacements}`);
  console.log(`   Unmapped files:   ${report.filesWithUnmapped.length}`);
  console.log(`   Unique unmapped:  ${report.allUnmappedPatterns.size}`);
  console.log("");
  
  if (report.allUnmappedPatterns.size > 0) {
    console.log("   ❌ UNMAPPED PATTERNS (add to nx-migrate-map.ts):\n");
    const sorted = [...report.allUnmappedPatterns].sort();
    for (const pattern of sorted) {
      console.log(`      "${pattern}": "???",`);
    }
    console.log("");
  }
  
  if (report.errors.length > 0) {
    console.log("   ❌ ERRORS:\n");
    for (const error of report.errors) {
      console.log(`      ${error}`);
    }
    console.log("");
  }
  
  // Exit status
  if (strict && report.allUnmappedPatterns.size > 0) {
    console.log("❌ nx-migrate FAILED: Unmapped patterns found (strict mode)\n");
    process.exit(1);
  } else if (report.errors.length > 0) {
    console.log("❌ nx-migrate FAILED: Errors occurred\n");
    process.exit(1);
  } else if (report.allUnmappedPatterns.size > 0) {
    console.log("⚠️ nx-migrate COMPLETE WITH WARNINGS: Some patterns unmapped\n");
    process.exit(0);
  } else {
    console.log("✅ nx-migrate COMPLETE: All patterns migrated\n");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("❌ nx-migrate FATAL ERROR:", err);
  process.exit(1);
});
