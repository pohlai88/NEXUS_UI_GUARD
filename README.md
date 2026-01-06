# ⚖️ NEXUS UI GUARD

> **Nexus UI Guard is not a design system.**
> **It is a governance system for design systems.**

[![Constitutional Enforcement](https://img.shields.io/badge/Constitution-v1.0.0-indigo)](./docs/CONSTITUTION.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Tailwind v4](https://img.shields.io/badge/Tailwind-v4.1+-cyan)](https://tailwindcss.com)

---

## Why UI Guard Exists

**Design systems fail not at creation, but at enforcement.**

Every team starts with good intentions:
- "We'll use semantic tokens"
- "No raw hex colors"
- "Consistent spacing everywhere"

Within 6 months:
- `bg-[#f5f5f5]` appears 47 times
- `text-gray-500` and `text-neutral-500` fight for dominance
- Someone adds `text-[13px]` because "it just looks better"

**UI Guard prevents this.**

---

## What UI Guard Provides

| Dimension | Without Guard | With Guard |
|-----------|---------------|------------|
| Design tokens | Drift | **Immutable** |
| UI consistency | Best-effort | **Enforced** |
| Refactors | Manual, error-prone | **Deterministic** |
| Migration | Fear-driven, avoided | **Scripted** |
| CI pipeline | Tests code, ignores design | **Enforces law** |
| Team alignment | Opinions, meetings, debates | **Constitution** |

---

## The System

### 📜 The Constitution (`ui/canonical.ts`)

Single source of truth for all design tokens. Pure data, no logic.

```typescript
export const NX_SEMANTICS = {
  "surface": "#ffffff",
  "primary": "var(--nx-indigo-600)",
  "danger": "var(--nx-red-500)",
  // ...
} as const;
```

### 🏛️ The Legislature (`scripts/nx-generate.ts`)

Converts constitutional data into CSS custom properties. Deterministic. Idempotent.

```bash
npm run nx:generate
```

### ⚖️ The Supreme Court (`scripts/nx-validate.ts`)

Verifies generated CSS matches constitutional source via hash comparison.

```bash
npm run nx:validate
# ✓ All 12 sections in sync
```

### 🚔 The Police (`scripts/nx-check.ts`)

Scans codebase for forbidden patterns. Blocks CI on violations.

```bash
npm run nx:check
# ❌ CONSTITUTIONAL VIOLATIONS DETECTED: 3
#    apps/portal/page.tsx:45 [bg-gray-500] ...
```

### 🔄 Transitional Justice (`scripts/nx-migrate.ts`)

One-time mass migration from legacy systems (AIBOS, raw Tailwind).

```bash
npm run nx:migrate --dry-run
# 4,134 replacements across 295 files
```

---

## Installation

### From GitHub (Recommended for Now)

```json
{
  "devDependencies": {
    "@nexus/ui-guard": "github:pohlai88/NEXUS_UI_GUARD"
  }
}
```

### From npm (Coming Soon)

```bash
npm install @nexus/ui-guard
```

---

## Usage in Consumer Repositories

### 1. Import the Constitution

```typescript
import { NX_SEMANTICS, NX_TYPOGRAPHY } from "@nexus/ui-guard";
```

### 2. Import the Stylesheet

```css
@import "@nexus/ui-guard/style.css";
```

### 3. Add CI Enforcement

```yaml
# .github/workflows/ui-guard.yml
name: Constitutional Enforcement
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npx nx-check
```

---

## Forbidden Patterns

The Constitution explicitly forbids:

```typescript
export const FORBIDDEN_PATTERNS = [
  "bg-blue-*", "bg-red-*", "bg-gray-*",  // Raw Tailwind colors
  "text-[#*", "bg-[#*",                   // Arbitrary hex values
  "na-*",                                 // Legacy AIBOS patterns
] as const;
```

Use semantic tokens instead:

| ❌ Forbidden | ✅ Constitutional |
|-------------|------------------|
| `bg-gray-100` | `bg-nx-surface-well` |
| `text-red-500` | `text-nx-danger` |
| `border-[#e5e5e5]` | `border-nx-border` |

---

## Repository Structure

```
nexus-ui-guard/
├─ ui/
│  ├─ canonical.ts      # THE CONSTITUTION (data only)
│  └─ input.css         # CSS with marker sections
│
├─ scripts/
│  ├─ nx-generate.ts    # Legislature (writes law into CSS)
│  ├─ nx-validate.ts    # Supreme Court (hash verification)
│  ├─ nx-check.ts       # Police (pattern enforcement)
│  ├─ nx-migrate.ts     # Transitional Justice (mass migration)
│  └─ nx-migrate-map.ts # Precedent Table (lawful mappings)
│
├─ eslint/
│  └─ canonical-rule.js # Constitutional Safeguard (AST enforcement)
│
├─ docs/
│  ├─ CONSTITUTION.md   # What the law is
│  ├─ COURTS.md         # How the law is enforced
│  ├─ MIGRATION.md      # How legacy is absorbed
│  └─ AMENDMENTS.md     # How the law may change
│
├─ package.json
├─ README.md
└─ LICENSE
```

---

## Why GitHub First, npm Later

- **GitHub = Inspectable law** — Every change is auditable
- **Git history = Legal precedent** — Every decision is recorded
- **Issues = Constitutional debate** — Proposals are public
- **PRs = Amendment proposals** — Changes require review

npm publication comes **after legitimacy is established**, not before.

---

## Contributing

### Proposing Amendments

1. Open a GitHub Issue with `[RFC]` prefix
2. Describe the change and rationale
3. Wait for 7-day review period
4. If approved, submit PR with version bump

### What Requires Amendment

- Adding/removing tokens in `canonical.ts`
- Changing forbidden patterns
- Modifying enforcement behavior
- Breaking changes to script APIs

### What Does NOT Require Amendment

- Bug fixes in scripts
- Documentation updates
- Performance improvements
- Adding new convenience utilities

---

## Version Policy

| Version Bump | When |
|--------------|------|
| MAJOR (2.0.0) | Breaking changes to tokens or enforcement |
| MINOR (1.1.0) | New tokens, new patterns, new features |
| PATCH (1.0.1) | Bug fixes, documentation, performance |

---

## License

MIT — See [LICENSE](./LICENSE)

**Open law, closed interpretation.**

The code is open. The authority to interpret and enforce the Constitution remains with the Nexus governance body.

---

## Status

**v1.0.0 — Ratified**

The Nexus Design Constitution is now in effect. All consuming repositories must comply.
