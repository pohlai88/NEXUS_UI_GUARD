# 📜 NEXUS DESIGN CONSTITUTION v1.0.0

> **Ratified: January 6, 2026**
> **Status: IN EFFECT**

---

## Preamble

We, the builders of the Nexus ecosystem, in order to form a more perfect design system, establish justice in UI consistency, ensure domestic tranquility across applications, provide for the common defense against design drift, promote the general welfare of developer experience, and secure the blessings of maintainability to ourselves and our posterity, do ordain and establish this Constitution for the Nexus UI Guard.

---

## Article I — Supremacy of Tokens

### Section 1: The Constitution

The file `ui/canonical.ts` is the supreme law of the Nexus design system. All UI decisions, color choices, typography scales, spacing values, and component styles must derive from this single source of truth.

### Section 2: Constitutional Constraints

The Constitution (`canonical.ts`) shall:
- Contain **ONLY pure data exports**
- Have **ZERO imports**
- Have **ZERO functions**
- Have **ZERO runtime logic**
- Have **ZERO computed values**
- Be **safely importable** in any environment (server, client, tooling, CI)

### Section 3: Immutability

No token value may be modified without constitutional amendment. Inline overrides, CSS-in-JS alternatives, and "just this once" exceptions are unconstitutional.

---

## Article II — The Token Hierarchy

### Section 1: Color Primitives

Raw color values defined in OKLCH color space for P3 wide gamut support:

```typescript
NX_COLOR_PRIMITIVES = {
  titanium: { /* neutral scale */ },
  indigo: { /* primary brand */ },
  cyan: { /* accent/link */ },
  emerald: { /* success */ },
  amber: { /* warning */ },
  red: { /* danger */ },
}
```

### Section 2: Semantic Tokens

Meaning-based tokens that reference primitives:

```typescript
NX_SEMANTICS = {
  "primary": "var(--nx-indigo-600)",
  "danger": "var(--nx-red-500)",
  "surface": "#ffffff",
  // ...
}
```

### Section 3: Typography Tokens

Font stacks, sizes, line heights, weights, and tracking:

```typescript
NX_TYPOGRAPHY = {
  "font-sans": "-apple-system, ...",
  "display-size": "2.25rem",
  "body-size": "0.875rem",
  // ...
}
```

### Section 4: Spacing Tokens

Consistent spacing scale:

```typescript
NX_SPACING = {
  "1": "0.25rem",
  "2": "0.5rem",
  "4": "1rem",
  // ...
}
```

### Section 5: Shape Tokens

Border radius values:

```typescript
NX_RADIUS = {
  "sm": "0.75rem",
  "md": "1rem",
  "control": "var(--nx-radius-sm)",
}
```

### Section 6: Elevation Tokens

Shadow values for depth hierarchy:

```typescript
NX_SHADOW = {
  "1": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "3": "0 4px 6px -1px rgb(0 0 0 / 0.1), ...",
}
```

### Section 7: Motion Tokens

Animation durations and easing curves:

```typescript
NX_MOTION = {
  "dur-fast": "140ms",
  "dur-base": "220ms",
  "ease-standard": "cubic-bezier(0.2, 0.9, 0.2, 1)",
}
```

---

## Article III — Forbidden Patterns

### Section 1: Declaration

The following patterns are hereby declared **unconstitutional** and shall be rejected by enforcement tooling:

```typescript
FORBIDDEN_PATTERNS = [
  /* Raw Tailwind colors */
  "bg-blue-*", "bg-red-*", "bg-gray-*", "bg-slate-*",
  "text-blue-*", "text-red-*", "text-gray-*",
  "border-blue-*", "border-red-*", "border-gray-*",
  
  /* Arbitrary values */
  "bg-[#*", "text-[#*", "border-[#*",
  
  /* Legacy patterns */
  "na-*", "aibos", "AIBOS",
]
```

### Section 2: Rationale

Raw color utilities create:
- **Semantic blindness**: `text-gray-500` means nothing
- **Inconsistency**: Teams pick different shades
- **Migration hell**: Changing brand color requires find-replace
- **Accessibility gaps**: No guaranteed contrast ratios

### Section 3: Constitutional Alternatives

| Forbidden | Constitutional |
|-----------|----------------|
| `bg-gray-100` | `bg-nx-surface-well` |
| `bg-red-500` | `bg-nx-danger` |
| `text-gray-600` | `text-nx-text-sub` |
| `border-gray-200` | `border-nx-border` |
| `bg-[#f5f5f5]` | `bg-nx-canvas` |

---

## Article IV — Separation of Powers

### Section 1: The Legislature (`nx-generate.ts`)

**Power**: Write law into CSS.

Converts constitutional data into CSS custom properties. Operates deterministically. Output is hash-verified.

### Section 2: The Supreme Court (`nx-validate.ts`)

**Power**: Declare drift illegal.

Compares generated CSS against constitutional source. Any mismatch is a constitutional crisis.

### Section 3: The Police (`nx-check.ts`)

**Power**: Block merges, fail CI.

Scans all source files for forbidden patterns. Reports violations with file:line precision.

### Section 4: Transitional Justice (`nx-migrate.ts`)

**Power**: Absorb legacy systems.

One-time amnesty for legacy code. Mechanically converts old patterns to constitutional equivalents.

---

## Article V — Amendment Process

### Section 1: Proposal

Any person may propose an amendment by:
1. Opening a GitHub Issue with `[RFC]` prefix
2. Describing the change and rationale
3. Providing migration path for breaking changes

### Section 2: Review Period

All amendments must have a **minimum 7-day review period** before ratification.

### Section 3: Approval

Amendments require approval from at least one maintainer.

### Section 4: Versioning

| Change Type | Version Bump |
|-------------|--------------|
| Breaking (token removal, rename) | MAJOR |
| Additive (new tokens) | MINOR |
| Fix (typo, clarification) | PATCH |

### Section 5: Ratification

Upon approval, the maintainer shall:
1. Merge the amendment PR
2. Update `NX_VERSION` in canonical.ts
3. Tag a GitHub release
4. Publish to npm (if applicable)

---

## Article VI — Supremacy Clause

### Section 1: Hierarchy

This Constitution, and the laws made in pursuance thereof, shall be the supreme law of the Nexus design system. Judges (CI systems) in every repository shall be bound thereby, anything in local configurations to the contrary notwithstanding.

### Section 2: No Local Overrides

Consumer repositories **SHALL NOT**:
- Copy constitutional files locally
- Patch enforcement scripts
- Shadow token definitions
- Disable CI checks

If a change is needed: **Amend the Constitution upstream.**

---

## Article VII — Ratification

This Constitution shall be in effect upon:
1. ✅ Push to `github:pohlai88/NEXUS_UI_GUARD`
2. ✅ Tagging of `v1.0.0` release
3. ✅ First consumer repository adopting the dependency

---

## Signatures

Ratified by the Nexus Kernel governance body.

**Date**: January 6, 2026
**Version**: 1.0.0
**Authority**: Supreme Court of the Nexus Design Constitution
