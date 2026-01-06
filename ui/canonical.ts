/**
 * NEXUS DESIGN CONSTITUTION — CANONICAL SOURCE
 *
 * ⚠️ CONSTITUTIONAL FILE — DO NOT ADD LOGIC ⚠️
 *
 * Constraints:
 * - No imports
 * - No functions
 * - No runtime logic
 * - No computed values
 * - Purely declarative, data-only exports
 *
 * Safe to import from any environment (server, client, tooling, CI).
 * All UI tokens in the system MUST originate from this file.
 *
 * @package nexus-kernel
 * @version 1.0.0
 */

/* ============================================================
 * Version Lock
 * ============================================================ */

export const NX_VERSION = "1.0.0" as const;

/* ============================================================
 * COLOR PRIMITIVES — Quantum Obsidian Theme
 * P3 Wide Gamut OKLCH tokens
 * ============================================================ */

export const NX_COLOR_PRIMITIVES = {
  /** Chromatic Titanium Neutrals — Indigo-tinted greys (Hue 275°) */
  titanium: {
    50: "oklch(0.99 0.002 275)",
    100: "oklch(0.965 0.004 275)",
    200: "oklch(0.92 0.008 275)",
    300: "oklch(0.84 0.012 275)",
    400: "oklch(0.68 0.020 275)",
    500: "oklch(0.55 0.025 275)",
    600: "oklch(0.43 0.022 275)",
    700: "oklch(0.34 0.018 275)",
    800: "oklch(0.26 0.014 275)",
    900: "oklch(0.20 0.012 275)",
    950: "oklch(0.12 0.015 275)",
  },
  /** Quantum Indigo Primary — Deep authority with AI intelligence */
  indigo: {
    50: "oklch(0.97 0.015 275)",
    100: "oklch(0.93 0.030 275)",
    200: "oklch(0.87 0.060 275)",
    300: "oklch(0.79 0.110 275)",
    400: "oklch(0.68 0.180 275)",
    500: "oklch(0.55 0.250 275)",
    600: "oklch(0.48 0.280 275)",
    700: "oklch(0.42 0.240 275)",
    800: "oklch(0.35 0.180 275)",
    900: "oklch(0.28 0.120 275)",
  },
  /** Electric Cyan Accent — The Laser (single accent, maximum precision) */
  cyan: {
    50: "oklch(0.98 0.015 200)",
    400: "oklch(0.79 0.160 205)",
    500: "oklch(0.75 0.180 200)",
    600: "oklch(0.62 0.150 200)",
    800: "oklch(0.45 0.100 200)",
  },
  /** Status: Success — Emerald */
  emerald: {
    50: "oklch(0.96 0.025 165)",
    500: "oklch(0.65 0.200 162)",
    700: "oklch(0.50 0.170 163)",
  },
  /** Status: Warning — Amber */
  amber: {
    50: "oklch(0.98 0.035 90)",
    500: "oklch(0.77 0.220 68)",
    700: "oklch(0.55 0.160 66)",
  },
  /** Status: Danger — Red */
  red: {
    50: "oklch(0.97 0.020 20)",
    500: "oklch(0.64 0.280 25)",
    700: "oklch(0.51 0.240 27)",
  },
} as const satisfies Record<string, Record<number, string>>;

/* ============================================================
 * sRGB FALLBACKS — Graceful Degradation for Older Displays
 * ============================================================ */

export const NX_SRGB_FALLBACKS = {
  "indigo-600": "oklch(0.48 0.200 275)",
  "indigo-500": "oklch(0.55 0.180 275)",
  "cyan-500": "oklch(0.75 0.140 200)",
  "emerald-500": "oklch(0.65 0.160 162)",
  "amber-500": "oklch(0.77 0.180 68)",
  "red-500": "oklch(0.64 0.230 25)",
} as const satisfies Record<string, string>;

/* ============================================================
 * SEMANTIC TOKENS — Meaning Mappings
 * ============================================================ */

export const NX_SEMANTICS = {
  /* Surface Hierarchy */
  canvas: "var(--nx-titanium-50)",
  surface: "#ffffff",
  "surface-well": "var(--nx-titanium-100)",
  raised: "#ffffff",
  overlay: "#ffffff",
  selected: "var(--nx-titanium-100)",

  /* Borders & Dividers */
  border: "var(--nx-titanium-200)",
  "border-strong": "var(--nx-titanium-300)",
  divider: "var(--nx-titanium-200)",

  /* Text Hierarchy */
  "text-main": "var(--nx-titanium-900)",
  "text-sub": "var(--nx-titanium-600)",
  "text-muted": "var(--nx-titanium-500)",
  "text-faint": "var(--nx-titanium-400)",
  "text-inverse": "#ffffff",

  /* Brand Primary */
  primary: "var(--nx-indigo-600)",
  "primary-hover": "var(--nx-indigo-700)",
  "primary-foreground": "#ffffff",
  "primary-light": "var(--nx-indigo-50)",

  /* Secondary */
  secondary: "var(--nx-titanium-700)",
  "secondary-hover": "var(--nx-titanium-800)",
  "secondary-foreground": "#ffffff",

  /* Ghost/Subtle */
  ghost: "transparent",
  "ghost-hover": "var(--nx-titanium-100)",

  /* Links */
  link: "var(--nx-cyan-500)",
  "link-hover": "var(--nx-cyan-600)",

  /* Status: Success */
  success: "var(--nx-emerald-500)",
  "success-bg": "var(--nx-emerald-50)",
  "success-text": "var(--nx-emerald-700)",

  /* Status: Warning */
  warning: "var(--nx-amber-500)",
  "warning-bg": "var(--nx-amber-50)",
  "warning-text": "var(--nx-amber-700)",

  /* Status: Danger */
  danger: "var(--nx-red-500)",
  "danger-bg": "var(--nx-red-50)",
  "danger-text": "var(--nx-red-700)",

  /* Status: Info */
  info: "var(--nx-cyan-500)",
  "info-bg": "var(--nx-cyan-50)",
  "info-text": "var(--nx-cyan-600)",

  /* Focus & Interaction */
  ring: "var(--nx-indigo-600)",
  scrim: "oklch(0.12 0.015 275 / 0.45)",
} as const satisfies Record<string, string>;

/* ============================================================
 * TYPOGRAPHY TOKENS
 * ============================================================ */

export const NX_TYPOGRAPHY = {
  /* Font Stacks */
  "font-sans": '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  "font-mono": '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',

  /* Display Scale */
  "display-size": "2.25rem",
  "display-line": "2.75rem",
  "title-size": "1.5rem",
  "title-line": "2rem",
  "section-size": "1.125rem",
  "section-line": "1.75rem",
  "body-size": "0.875rem",
  "body-line": "1.5rem",
  "caption-size": "0.75rem",
  "caption-line": "1.25rem",
  "micro-size": "0.6875rem",
  "micro-line": "1rem",

  /* Font Weights */
  "weight-regular": "400",
  "weight-medium": "500",
  "weight-semibold": "600",
  "weight-bold": "700",

  /* Letter Spacing */
  "tracking-tight": "-0.015em",
  "tracking-normal": "0",
  "tracking-wide": "0.025em",
} as const satisfies Record<string, string>;

/* ============================================================
 * SPACING TOKENS
 * ============================================================ */

export const NX_SPACING = {
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
} as const satisfies Record<string, string>;

export const NX_SPACING_SEMANTIC = {
  "inline-tight": "var(--nx-space-2)",
  "inline": "var(--nx-space-3)",
  "inline-loose": "var(--nx-space-4)",
  "stack-tight": "var(--nx-space-3)",
  "stack": "var(--nx-space-4)",
  "stack-loose": "var(--nx-space-6)",
  "section": "var(--nx-space-8)",
  "page": "var(--nx-space-12)",
} as const satisfies Record<string, string>;

/* ============================================================
 * SIZING TOKENS
 * ============================================================ */

export const NX_SIZING = {
  "container-max": "80rem",
  "header-h": "4.25rem",
  "sidebar-w": "17.5rem",
  "sidebar-w-collapsed": "4.25rem",
  "drawer-w": "24rem",
  "content-max": "72rem",
  "content-pad": "1.5rem",
} as const satisfies Record<string, string>;

/* ============================================================
 * SHAPE TOKENS (Border Radius)
 * ============================================================ */

export const NX_RADIUS = {
  "xs": "0.5rem",
  "sm": "0.75rem",
  "md": "1rem",
  "lg": "1.25rem",
  "control": "var(--nx-radius-sm)",
} as const satisfies Record<string, string>;

export const NX_BORDER = {
  "1": "1px",
  "2": "2px",
} as const satisfies Record<string, string>;

/* ============================================================
 * ELEVATION TOKENS (Shadows)
 * ============================================================ */

export const NX_SHADOW = {
  "0": "none",
  "1": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "2": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "3": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "4": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "5": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const satisfies Record<string, string>;

export const NX_ZINDEX = {
  "base": "0",
  "sticky": "10",
  "overlay": "20",
  "dropdown": "30",
  "popover": "40",
  "tooltip": "50",
  "scrim": "60",
  "modal": "70",
  "toast": "80",
  "debug": "90",
} as const satisfies Record<string, string>;

/* ============================================================
 * MOTION TOKENS
 * ============================================================ */

export const NX_MOTION = {
  "dur-fast": "140ms",
  "dur-base": "220ms",
  "dur-slow": "360ms",
  "ease-standard": "cubic-bezier(0.2, 0.9, 0.2, 1)",
  "ease-emphasized": "cubic-bezier(0.2, 0, 0, 1)",
  "lift-1": "2px",
  "lift-2": "4px",
  "slide-1": "8px",
  "slide-2": "16px",
} as const satisfies Record<string, string>;

/* ============================================================
 * BREAKPOINTS
 * ============================================================ */

export const NX_BREAKPOINTS = {
  "sm": "40rem",
  "md": "48rem",
  "lg": "64rem",
  "xl": "80rem",
  "2xl": "96rem",
} as const satisfies Record<string, string>;

/* ============================================================
 * FORBIDDEN PATTERNS — Constitutional Enforcement
 * Patterns that nx-check.ts will reject in codebase
 * ============================================================ */

export const FORBIDDEN_PATTERNS = [
  /* Raw Tailwind colors (must use nx-* tokens) */
  "bg-blue-",
  "bg-red-",
  "bg-green-",
  "bg-gray-",
  "bg-slate-",
  "bg-zinc-",
  "bg-neutral-",
  "bg-stone-",
  "bg-orange-",
  "bg-amber-",
  "bg-yellow-",
  "bg-lime-",
  "bg-emerald-",
  "bg-teal-",
  "bg-cyan-",
  "bg-sky-",
  "bg-indigo-",
  "bg-violet-",
  "bg-purple-",
  "bg-fuchsia-",
  "bg-pink-",
  "bg-rose-",
  "text-blue-",
  "text-red-",
  "text-green-",
  "text-gray-",
  "text-slate-",
  "text-zinc-",
  "text-neutral-",
  "text-stone-",
  "text-indigo-",
  "text-violet-",
  "text-purple-",
  "border-blue-",
  "border-red-",
  "border-green-",
  "border-gray-",
  /* Arbitrary hex values */
  "bg-[#",
  "text-[#",
  "border-[#",
  "ring-[#",
  "fill-[#",
  "stroke-[#",
  /* Legacy AIBOS patterns */
  "na-",
  "aibos",
  "AIBOS",
] as const;

/* ============================================================
 * REQUIRED PATTERNS — Constitutional Enforcement
 * Patterns that MUST be present in certain file types
 * ============================================================ */

export const REQUIRED_PATTERNS = [
  /* All color utilities must use nx- prefix */
  "nx-",
] as const;

/* ============================================================
 * TypeScript Types (Derived from Const Arrays)
 * ============================================================ */

export type NxColorPrimitive = keyof typeof NX_COLOR_PRIMITIVES;
export type NxColorStep = keyof (typeof NX_COLOR_PRIMITIVES)["titanium"];
export type NxSemanticToken = keyof typeof NX_SEMANTICS;
export type NxSpacingToken = keyof typeof NX_SPACING;
export type NxRadiusToken = keyof typeof NX_RADIUS;
export type NxShadowToken = keyof typeof NX_SHADOW;
export type NxMotionToken = keyof typeof NX_MOTION;
export type NxBreakpoint = keyof typeof NX_BREAKPOINTS;
export type ForbiddenPattern = (typeof FORBIDDEN_PATTERNS)[number];
