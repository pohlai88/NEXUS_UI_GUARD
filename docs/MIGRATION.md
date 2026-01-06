# 🔄 MIGRATION — Transitional Justice

> How legacy design systems are absorbed into the Nexus Constitution.

---

## Philosophy

Legacy systems are not "bad" — they are **expired**.

The AIBOS design system served its purpose. Raw Tailwind colors were expedient during rapid prototyping. These patterns are now **deprecated**, not **shameful**.

Migration is:
- **Mechanical**, not manual
- **Deterministic**, not heuristic
- **Complete**, not gradual
- **One-time**, not ongoing

---

## The Migration Engine (`nx-migrate.ts`)

### Purpose
Mass-convert legacy patterns to constitutional equivalents.

### Behavior
1. **SCAN**: Walk all source files in configured directories
2. **MATCH**: Find legacy patterns using precise regex
3. **REPLACE**: Apply mappings from `nx-migrate-map.ts`
4. **VERIFY**: Report any unmapped patterns

### Invocation

```bash
# Dry run (see what would change, no modifications)
npm run nx:migrate:dry

# Live run (actually modify files)
npm run nx:migrate

# Strict mode (fail if any patterns unmapped)
npm run nx:migrate:strict
```

### Output

```
⚖️ nx-migrate: Constitutional Migration Engine

   Mode: DRY RUN (no files modified)
   Strict: NO (report unmapped)

   Scanning 295 files...

   ✓ apps/portal/app/page.tsx (114 replacements)
   ✓ apps/portal/components/Card.tsx (23 replacements)
   ⚠️ apps/portal/components/Legacy.tsx (12 replacements)

════════════════════════════════════════════════════════════
   MIGRATION REPORT
════════════════════════════════════════════════════════════
   Files scanned:    295
   Replacements:     4,134
   Unmapped files:   1
   Unique unmapped:  2

   ❌ UNMAPPED PATTERNS (add to nx-migrate-map.ts):

      "na-custom-widget": "???",
      "bg-brand-accent": "???",

⚠️ nx-migrate COMPLETE WITH WARNINGS: Some patterns unmapped
```

---

## The Law Book (`nx-migrate-map.ts`)

### Purpose
Authoritative mapping table from legacy patterns to constitutional equivalents.

### Structure

```typescript
// AIBOS to Nexus mappings
export const AIBOS_TO_NX_MAP: Record<string, string> = {
  "na-btn-primary": "btn-primary",
  "na-card": "card",
  "na-text-danger": "text-nx-danger",
  // ...
};

// Raw Tailwind to Nexus mappings
export const RAW_TAILWIND_TO_NX_MAP: Record<string, string> = {
  "bg-gray-100": "bg-nx-surface-well",
  "text-red-500": "text-nx-danger",
  // ...
};
```

### Rules
- **No logic**: Pure data only
- **No inference**: Every mapping explicit
- **No fallbacks**: Missing mappings fail
- **Every target must exist**: Only map to real Nexus classes

---

## Migration Phases

### Phase 1: AIBOS Classes

Pattern: `na-*`

```
na-btn-primary  →  btn-primary
na-card         →  card
na-text-danger  →  text-nx-danger
na-bg-paper     →  bg-nx-surface
```

### Phase 2: Raw Tailwind Colors

Pattern: `bg-{color}-{shade}`, `text-{color}-{shade}`, `border-{color}-{shade}`

```
bg-gray-100     →  bg-nx-surface-well
bg-red-500      →  bg-nx-danger
text-gray-600   →  text-nx-text-sub
border-gray-200 →  border-nx-border
```

### Phase 3: CSS Selectors

For `<style jsx>` blocks containing legacy class selectors:

```
.na-shell-omni  →  .shell
.na-card        →  .card
```

### Phase 4: Import Statements

```
import { X } from "@aibos/kernel"     →  import { X } from "@nexus/kernel"
import { Y } from "aibos-design-system"  →  import { Y } from "@nexus/kernel"
```

---

## Handling Unmapped Patterns

### When Migration Reports Unmapped Patterns

1. **Identify the pattern**: Check the migration report output
2. **Determine the mapping**: What constitutional class should replace it?
3. **Add to law book**: Update `nx-migrate-map.ts`
4. **Re-run migration**: Execute again to complete

### Example

```
❌ UNMAPPED PATTERNS:
   "na-special-button": "???",
```

Add mapping:
```typescript
// In nx-migrate-map.ts
"na-special-button": "btn-primary",  // or appropriate equivalent
```

Re-run:
```bash
npm run nx:migrate
```

---

## Strict Mode

For CI enforcement, use strict mode:

```bash
npm run nx:migrate:strict
```

This will:
- **Exit 1** if any patterns are unmapped
- Block the pipeline until all patterns are resolved

---

## One-Time Amnesty

Migration is designed as a **one-time amnesty**:

1. Legacy code is acknowledged, not punished
2. All patterns are mechanically converted
3. After migration, `nx-check` enforces the Constitution
4. **Rollback is forbidden** — you cannot revert to legacy patterns

---

## Post-Migration

After successful migration:

1. ✅ All legacy `na-*` patterns replaced
2. ✅ All raw Tailwind colors replaced
3. ✅ Run `npm run nx:check` — should pass
4. ✅ Run `npm run nx:full` — complete validation
5. ✅ Commit with message: `chore: migrate to Nexus Constitution`

---

## Troubleshooting

### "Unmapped pattern: na-X"

The pattern exists in code but has no mapping. Add it to `AIBOS_TO_NX_MAP`.

### "Replacement not occurring"

Check if the pattern appears in an unexpected context:
- Inside a string template literal (`${}`)?
- Inside a CSS selector (`.na-class`)?
- With responsive prefix (`md:na-class`)?

Add appropriate variant mappings.

### "Pattern replaced incorrectly"

Longer patterns should match before shorter ones. The migration engine sorts by length, but check for edge cases.

### "Import not replaced"

Ensure the import path exactly matches entries in `IMPORT_REPLACEMENT_MAP`.
