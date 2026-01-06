# 📝 AMENDMENTS — How the Law May Change

> The process for modifying the Nexus Design Constitution.

---

## Principle

The Constitution is **not frozen**, but changes require:
- Formal proposal
- Public review
- Explicit approval
- Version tracking

"Move fast and break things" does not apply to governance.

---

## Amendment Categories

### Category A: Breaking Changes (MAJOR version)

Changes that **remove, rename, or alter** existing tokens:

| Example | Impact |
|---------|--------|
| Remove `NX_SEMANTICS.primary` | All uses break |
| Rename `bg-nx-surface` → `bg-nx-canvas` | All uses break |
| Change `--nx-space-4` from `1rem` to `0.875rem` | Visual regression |

**Requirements:**
- RFC with 14-day review period
- Migration path documented
- Deprecation warnings in previous minor version
- MAJOR version bump (e.g., 1.x.x → 2.0.0)

### Category B: Additive Changes (MINOR version)

Changes that **add new** tokens or patterns:

| Example | Impact |
|---------|--------|
| Add `NX_SEMANTICS.tertiary` | No breaking change |
| Add new color primitive | No breaking change |
| Add new component class | No breaking change |

**Requirements:**
- RFC with 7-day review period
- MINOR version bump (e.g., 1.0.x → 1.1.0)

### Category C: Fixes (PATCH version)

Changes that **fix bugs or typos** without semantic change:

| Example | Impact |
|---------|--------|
| Fix typo in comment | No impact |
| Improve script performance | No impact |
| Update documentation | No impact |

**Requirements:**
- PR with standard review
- PATCH version bump (e.g., 1.0.0 → 1.0.1)

---

## Amendment Process

### Step 1: Proposal

Open a GitHub Issue with:

**Title:** `[RFC] Add tertiary semantic token`

**Body:**
```markdown
## Summary
Propose adding a `tertiary` semantic token for secondary actions.

## Motivation
Currently we have `primary` and `secondary` but many UIs need a third tier.

## Proposed Change
Add to NX_SEMANTICS:
```typescript
"tertiary": "var(--nx-titanium-600)",
"tertiary-hover": "var(--nx-titanium-700)",
"tertiary-foreground": "#ffffff",
```

## Migration Path
N/A (additive change)

## Category
B (MINOR)
```

### Step 2: Review Period

| Category | Minimum Review |
|----------|----------------|
| A (Breaking) | 14 days |
| B (Additive) | 7 days |
| C (Fix) | 24 hours |

During this period:
- Community may comment
- Maintainers assess impact
- Alternative proposals considered

### Step 3: Decision

Maintainers will:
- **Approve**: Mark issue as accepted
- **Request Changes**: Ask for modifications
- **Reject**: Close with explanation

### Step 4: Implementation

Upon approval:

1. Create branch from `main`
2. Implement change in `canonical.ts`
3. Run `npm run nx:generate`
4. Update version in `package.json`
5. Update `NX_VERSION` in `canonical.ts`
6. Add entry to CHANGELOG.md
7. Submit PR referencing the RFC issue

### Step 5: Ratification

Upon PR merge:

1. Tag release (e.g., `v1.1.0`)
2. Publish to npm (if applicable)
3. Close RFC issue
4. Announce in relevant channels

---

## Version Changelog

All amendments must be recorded in `CHANGELOG.md`:

```markdown
## [1.1.0] - 2026-01-15

### Added
- `tertiary` semantic token for third-tier actions (#42)

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- Typo in CONSTITUTION.md (#45)
```

---

## Emergency Amendments

In case of **critical security issues or blocking bugs**:

1. Maintainer may bypass normal review
2. Emergency fix deployed immediately
3. Retrospective RFC opened within 24 hours
4. Community notified of emergency action

Emergency amendments should be **extremely rare**.

---

## Who May Propose

**Anyone** may propose an amendment:
- Repository contributors
- Consumer repository maintainers
- End users

The Constitution is open law.

---

## Who May Approve

Only **designated maintainers** may approve amendments.

Current maintainers are listed in the repository's CODEOWNERS file.

---

## Precedent

All amendments become **legal precedent**:
- Git history records the change
- Issue discussion documents rationale
- Future proposals may reference past decisions

"We decided this in RFC #42" is a valid argument.

---

## Anti-Patterns

### ❌ "Can we just add this real quick?"

No. All changes go through the amendment process.

### ❌ "I'll override it locally"

Unconstitutional. Amend upstream or comply.

### ❌ "This is too bureaucratic"

The bureaucracy exists because "move fast and break things" destroyed previous design systems. Due process is the cost of stability.

### ❌ "The review period is too long"

Plan ahead. If you need a token urgently, you should have proposed it earlier.

---

## Template: RFC Issue

```markdown
# [RFC] <Short Title>

## Summary
One-paragraph description of the proposed change.

## Motivation
Why is this change needed? What problem does it solve?

## Proposed Change
Detailed specification of what will change.

## Migration Path
For breaking changes: How will consumers update?

## Alternatives Considered
What other approaches were considered and why rejected?

## Category
A (Breaking) / B (Additive) / C (Fix)

## Checklist
- [ ] I have searched for existing RFCs addressing this
- [ ] I have considered the impact on existing consumers
- [ ] I am willing to implement this if approved
```
