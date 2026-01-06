# ⚖️ COURTS — Enforcement System

> How the Nexus Design Constitution is enforced.

---

## Overview

The Nexus UI Guard operates a three-branch enforcement system:

| Branch | Script | Power | Failure Mode |
|--------|--------|-------|--------------|
| Legislature | `nx-generate.ts` | Write law | Exit 1 on missing markers |
| Supreme Court | `nx-validate.ts` | Verify law | Exit 1 on drift |
| Police | `nx-check.ts` | Enforce law | Exit 1 on violations |

---

## 1. The Legislature (`nx-generate.ts`)

### Purpose
Converts constitutional data from `canonical.ts` into CSS custom properties.

### Behavior
- Reads all exports from `ui/canonical.ts`
- Injects content between `/* NX:SECTION:START */` and `/* NX:SECTION:END */` markers in `input.css`
- Computes SHA-256 hash of each section for verification
- **Deterministic**: Same input always produces same output
- **Idempotent**: Running twice produces identical result

### Invocation
```bash
npm run nx:generate
# or
npx nx-generate
```

### Output
```
🔧 nx-generate: Starting constitutional generation...

   NX_VERSION: 1.0.0
   ✓ COLOR_PRIMITIVES (35 tokens)
   ✓ SEMANTICS (39 tokens)
   ✓ TYPOGRAPHY (21 tokens)
   ✓ SPACING (11 tokens)
   ...

✅ nx-generate complete (NX_VERSION: 1.0.0)
```

### Exit Codes
| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Missing marker, missing canonical data, or write failure |

---

## 2. The Supreme Court (`nx-validate.ts`)

### Purpose
Verifies that generated CSS matches the constitutional source.

### Behavior
- **READ-ONLY**: Never modifies files
- Loads canonical data from `ui/canonical.ts`
- Extracts hash from each section in `input.css`
- Compares extracted hash against computed hash from canonical data
- Reports drift if mismatch detected

### Invocation
```bash
npm run nx:validate
# or
npx nx-validate
```

### Output (Clean)
```
🔍 nx-validate: Starting constitutional validation...

   NX_VERSION: 1.0.0
   ✓ COLOR_PRIMITIVES (sha256-8d8ed64fde28)
   ✓ SEMANTICS (sha256-0ccd4e7665d8)
   ✓ TYPOGRAPHY (sha256-d04a48e9c5be)
   ...

✅ nx-validate complete: All 12 sections in sync
```

### Output (Drift Detected)
```
🔍 nx-validate: Starting constitutional validation...

   NX_VERSION: 1.0.0
   ✓ COLOR_PRIMITIVES (sha256-8d8ed64fde28)
   ❌ SEMANTICS: DRIFT DETECTED
      Expected: sha256-0ccd4e7665d8
      Actual:   sha256-abc123def456
   ...

❌ DRIFT DETECTED: 1 section(s) out of sync
   Run 'npm run nx:generate' to synchronize
```

### Exit Codes
| Code | Meaning |
|------|---------|
| 0 | All sections in sync |
| 1 | Drift detected, missing markers, or parse error |

---

## 3. The Police (`nx-check.ts`)

### Purpose
Scans codebase for forbidden patterns defined in the Constitution.

### Behavior
- Loads `FORBIDDEN_PATTERNS` from `canonical.ts`
- Walks all `.tsx`, `.ts`, `.css`, `.jsx`, `.js` files in configured directories
- Matches patterns against file content
- Reports violations with file:line:pattern detail

### Invocation
```bash
npm run nx:check
# or
npx nx-check
```

### Output (Clean)
```
🔍 nx-check: Scanning for constitutional violations...

   Loaded 46 forbidden patterns
   Scanning 317 files...

✅ nx-check complete: No violations found in 317 files
```

### Output (Violations)
```
🔍 nx-check: Scanning for constitutional violations...

   Loaded 46 forbidden patterns
   Scanning 317 files...

❌ CONSTITUTIONAL VIOLATIONS DETECTED: 3

   📄 apps/portal/app/page.tsx
      L45: [bg-gray-500] <div className="bg-gray-500 p-4">
      L89: [text-red-400] <span className="text-red-400">Error</span>

   📄 apps/portal/components/Card.tsx
      L12: [border-[#e5e5e5]] className="border-[#e5e5e5]"

   Fix violations and run 'npm run nx:check' again
```

### Exit Codes
| Code | Meaning |
|------|---------|
| 0 | No violations |
| 1 | Violations detected |

### Excluded Files
The following are automatically excluded from scanning:
- `node_modules/`
- `.next/`
- `dist/`
- `coverage/`
- `canonical.ts` (the law itself)
- `nx-*.ts` (enforcement scripts)
- `style.css` (generated output)

---

## 4. CI Integration

### GitHub Actions Example

```yaml
name: Constitutional Enforcement
on: [push, pull_request]

jobs:
  ui-guard:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - run: npm install
      
      - name: Validate Constitution
        run: npx nx-validate
        
      - name: Check Violations
        run: npx nx-check
```

### Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit

npx nx-check
if [ $? -ne 0 ]; then
  echo "❌ Constitutional violations detected. Fix before committing."
  exit 1
fi
```

---

## 5. Full Compliance Pipeline

### The `nx:full` Command

Runs all courts in sequence:

```bash
npm run nx:full
```

Equivalent to:
```bash
npm run nx:generate && npm run nx:validate && npm run nx:check
```

### Recommended Workflow

1. **On commit**: Run `nx:check` (fast, catches violations)
2. **On PR**: Run `nx:full` (complete verification)
3. **On main branch**: Run `nx:full` + build

---

## 6. Troubleshooting

### "Missing marker: NX:SECTION:START"

The `input.css` file is missing required markers. Ensure it contains:

```css
/* NX:COLOR_PRIMITIVES:START */
/* NX:COLOR_PRIMITIVES:END */

/* NX:SEMANTICS:START */
/* NX:SEMANTICS:END */
/* ... etc for all sections ... */
```

### "DRIFT DETECTED"

The CSS is out of sync with `canonical.ts`. Run:

```bash
npm run nx:generate
```

### "CONSTITUTIONAL VIOLATIONS DETECTED"

Your code contains forbidden patterns. Either:
1. Replace with constitutional alternatives (see CONSTITUTION.md)
2. Add missing mappings to `nx-migrate-map.ts` and run migration

### "Cannot find ui/canonical.ts"

Ensure you're running from the correct directory and the package is properly installed.
