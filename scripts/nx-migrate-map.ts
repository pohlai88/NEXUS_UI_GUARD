/**
 * NEXUS DESIGN CONSTITUTION — MIGRATION LAW BOOK
 *
 * ⚠️ CONSTITUTIONAL FILE — DO NOT ADD LOGIC ⚠️
 *
 * This file contains the authoritative mapping from:
 * - AIBOS (na-*) classes → Nexus (nx-*) tokens
 * - Raw Tailwind colors → Nexus semantic tokens
 *
 * Rules:
 * - No logic
 * - No inference
 * - No fallbacks
 * - Every entry maps to an EXISTING generated token
 *
 * @package nexus-kernel
 * @version 1.0.0
 */

/* ============================================================
 * AIBOS → NEXUS CLASS MAP
 * Format: "old-class" → "new-class"
 * ============================================================ */

export const AIBOS_TO_NX_MAP: Record<string, string> = {
  /* ─────────────────────────────────────────────────────────
   * LAYOUT & CONTAINER
   * ───────────────────────────────────────────────────────── */
  "na-container": "max-w-[var(--nx-container-max)] mx-auto",
  "na-mx-auto": "mx-auto",
  "na-p-4": "p-4",
  "na-p-6": "p-6",
  "na-p-3": "p-3",
  "na-p-8": "p-8",
  "na-p-2": "p-2",
  "na-p-12": "p-12",
  "na-px-4": "px-4",
  "na-px-6": "px-6",
  "na-px-8": "px-8",
  "na-py-2": "py-2",
  "na-py-4": "py-4",
  "na-mb-1": "mb-1",
  "na-mb-2": "mb-2",
  "na-mb-3": "mb-3",
  "na-mb-4": "mb-4",
  "na-mb-6": "mb-6",
  "na-mb-8": "mb-8",
  "na-mb-12": "mb-12",
  "na-mt-1": "mt-1",
  "na-mt-2": "mt-2",
  "na-mt-3": "mt-3",
  "na-mt-4": "mt-4",
  "na-mt-6": "mt-6",
  "na-mt-8": "mt-8",
  "na-ml-1": "ml-1",
  "na-ml-2": "ml-2",
  "na-ml-4": "ml-4",
  "na-mr-2": "mr-2",
  "na-w-full": "w-full",
  "na-w-0.5": "w-0.5",
  "na-w-0": "w-0",
  "na-w-2": "w-2",
  "na-w-6": "w-6",
  "na-w-8": "w-8",
  "na-w-12": "w-12",
  "na-w-16": "w-16",
  "na-h-2": "h-2",
  "na-h-6": "h-6",
  "na-h-8": "h-8",
  "na-h-12": "h-12",
  "na-h-16": "h-16",
  "na-max-w-2xl": "max-w-2xl",

  /* ─────────────────────────────────────────────────────────
   * FLEX & GRID
   * ───────────────────────────────────────────────────────── */
  "na-flex": "flex",
  "na-flex-1": "flex-1",
  "na-flex-col": "flex-col",
  "na-flex-wrap": "flex-wrap",
  "na-flex-shrink-0": "flex-shrink-0",
  "na-items-center": "items-center",
  "na-items-start": "items-start",
  "na-items-end": "items-end",
  "na-justify-between": "justify-between",
  "na-justify-center": "justify-center",
  "na-gap-2": "gap-2",
  "na-gap-3": "gap-3",
  "na-gap-4": "gap-4",
  "na-gap-6": "gap-6",
  "na-grid": "grid",
  "na-grid-cols-1": "grid-cols-1",
  "na-grid-cols-2": "grid-cols-2",
  "na-grid-cols-3": "grid-cols-3",
  "na-grid-cols-4": "grid-cols-4",
  "na-grid-cols-6": "grid-cols-6",
  "na-col-span-1": "col-span-1",
  "na-col-span-2": "col-span-2",
  "lg:na-col-span-1": "lg:col-span-1",
  "lg:na-col-span-2": "lg:col-span-2",
  "na-space-y-1": "space-y-1",
  "na-space-y-2": "space-y-2",
  "na-space-y-3": "space-y-3",
  "na-space-y-4": "space-y-4",
  "na-space-y-6": "space-y-6",
  "md:na-grid-cols-2": "md:grid-cols-2",
  "md:na-grid-cols-3": "md:grid-cols-3",
  "md:na-col-span-2": "md:col-span-2",
  "lg:na-grid-cols-2": "lg:grid-cols-2",
  "lg:na-grid-cols-3": "lg:grid-cols-3",
  "lg:na-grid-cols-4": "lg:grid-cols-4",
  "lg:na-grid-cols-6": "lg:grid-cols-6",
  "md:na-grid-cols-4": "md:grid-cols-4",
  "md:na-grid-cols-6": "md:grid-cols-6",
  /* Grid layout patterns */
  "na-grid-responsive-3": "grid-responsive",
  "na-grid-responsive-4": "grid-responsive",
  "na-grid-responsive-3-cards": "grid-responsive",
  "na-grid-frozen": "grid-3-col",

  /* ─────────────────────────────────────────────────────────
   * SHELL & PAGE STRUCTURE
   * ───────────────────────────────────────────────────────── */
  "na-shell-main": "shell",
  "na-shell-omni": "shell",
  "na-shell-head": "page-header",
  "na-shell-rail": "flex flex-col gap-4",
  "na-view-controls": "flex gap-2 items-center",
  "na-view-pane": "flex-1",
  "na-state-radio": "hidden",
  "na-state-label": "cursor-pointer",

  /* ─────────────────────────────────────────────────────────
   * TYPOGRAPHY
   * ───────────────────────────────────────────────────────── */
  "na-h1": "text-[length:var(--nx-display-size)] leading-[var(--nx-display-line)] font-bold tracking-tight text-nx-text-main",
  "na-h2": "text-[length:var(--nx-title-size)] leading-[var(--nx-title-line)] font-semibold tracking-tight text-nx-text-main",
  "na-h3": "section",
  "na-h4": "text-base font-semibold text-nx-text-main",
  "na-h5": "text-sm font-semibold text-nx-text-main",
  "na-body": "text-[length:var(--nx-body-size)] leading-[var(--nx-body-line)] text-nx-text-main",
  "na-metadata": "caption",
  "na-label": "caption font-semibold",
  "na-data": "text-[length:var(--nx-body-size)] text-nx-text-main",
  "na-data-large": "text-[length:var(--nx-display-size)] font-bold text-nx-text-main",
  "na-text-sm": "text-sm",
  "na-text-xs": "text-xs",
  "na-text-lg": "text-lg",
  "na-text-2xl": "text-2xl",
  "na-text-4xl": "text-4xl",
  "na-text-6xl": "text-6xl",
  "na-text-center": "text-center",
  "na-text-right": "text-right",
  "na-font-semibold": "font-semibold",
  "na-font-medium": "font-medium",
  "na-font-mono": "font-mono",
  "na-truncate": "truncate",
  "na-line-through": "line-through",
  "na-text-muted": "text-nx-text-muted",
  "na-text-primary": "text-nx-primary",
  "na-text-success": "text-nx-success",
  "na-text-warning": "text-nx-warning",

  /* ─────────────────────────────────────────────────────────
   * CARDS & SURFACES
   * ───────────────────────────────────────────────────────── */
  "na-card": "card",

  /* ─────────────────────────────────────────────────────────
   * BUTTONS
   * ───────────────────────────────────────────────────────── */
  "na-btn": "inline-flex items-center justify-center rounded-[var(--nx-radius-control)] px-4 py-2 font-medium transition-colors cursor-pointer",
  "na-btn-primary": "btn-primary",
  "na-btn-secondary": "btn-secondary",
  "na-btn-ghost": "bg-transparent hover:bg-nx-ghost-hover text-nx-text-main",
  "na-btn-danger": "bg-nx-danger text-white hover:bg-nx-danger-text",
  "na-btn-outline": "border border-nx-border bg-transparent hover:bg-nx-surface-well",
  "na-btn-sm": "px-3 py-1.5 text-sm",

  /* ─────────────────────────────────────────────────────────
   * INPUTS & FORMS
   * ───────────────────────────────────────────────────────── */
  "na-input": "input",
  "na-checkbox": "accent-nx-primary cursor-pointer",
  "na-block": "block",
  "na-hidden": "hidden",
  "na-list-disc": "list-disc",
  "na-list-inside": "list-inside",

  /* ─────────────────────────────────────────────────────────
   * TABLES
   * ───────────────────────────────────────────────────────── */
  "na-table-wrap": "overflow-x-auto",
  "na-table-frozen": "table-professional w-full",
  "na-th": "table-header-cell",
  "na-tr": "table-row",
  "na-td": "table-data-cell",

  /* ─────────────────────────────────────────────────────────
   * STATUS BADGES & INDICATORS
   * ───────────────────────────────────────────────────────── */
  "na-badge": "badge",
  "na-badge-info": "badge-info",
  "na-status": "badge",
  "na-status-ok": "badge-success",
  "na-status-warn": "badge-warning",
  "na-status-bad": "badge-danger",
  "na-status-pending": "badge-info",
  "na-status-": "badge-",
  "ok": "badge-success",
  "warn": "badge-warning",

  /* ─────────────────────────────────────────────────────────
   * COLORS — TEXT (AIBOS semantic → Nexus semantic)
   * ───────────────────────────────────────────────────────── */
  "na-text-danger": "text-nx-danger",
  "na-text-warn": "text-nx-warning",
  "na-text-ok": "text-nx-success",
  "na-text-info": "text-nx-info",

  /* ─────────────────────────────────────────────────────────
   * COLORS — BACKGROUNDS (AIBOS semantic → Nexus semantic)
   * ───────────────────────────────────────────────────────── */
  "na-bg-paper": "bg-nx-surface",
  "na-bg-paper-2": "bg-nx-surface-well",
  "na-bg-paper-3": "bg-nx-canvas",
  "na-bg-muted": "bg-nx-surface-well",
  "na-bg-danger-subtle": "bg-nx-danger-bg",
  "na-bg-warn-subtle": "bg-nx-warning-bg",
  "na-bg-warning-subtle": "bg-nx-warning-bg",
  "na-bg-ok-subtle": "bg-nx-success-bg",
  "na-bg-success-subtle": "bg-nx-success-bg",
  "na-bg-info-subtle": "bg-nx-info-bg",
  "na-bg-primary-subtle": "bg-nx-primary-light",
  "na-bg-primary": "bg-nx-primary",
  "na-bg-black": "bg-black",
  "na-bg-opacity-50": "bg-opacity-50",

  /* ─────────────────────────────────────────────────────────
   * BORDERS & SHAPES
   * ───────────────────────────────────────────────────────── */
  "na-border": "border border-nx-border",
  "na-border-2": "border-2",
  "na-border-dashed": "border-dashed",
  "na-border-l-4": "border-l-4",
  "na-border-l-primary": "border-l-nx-primary",
  "na-border-danger": "border-nx-danger",
  "na-rounded": "rounded",
  "na-rounded-lg": "rounded-lg",
  "na-rounded-full": "rounded-full",
  "na-overflow-x-auto": "overflow-x-auto",
  "na-overflow-auto": "overflow-auto",
  "na-shadow-lg": "shadow-lg",

  /* ─────────────────────────────────────────────────────────
   * POSITIONING & DISPLAY
   * ───────────────────────────────────────────────────────── */
  "na-fixed": "fixed",
  "na-inset-0": "inset-0",
  "na-mx-4": "mx-4",
  "na-z-50": "z-50",

  /* ─────────────────────────────────────────────────────────
   * INTERACTIONS & STATES
   * ───────────────────────────────────────────────────────── */
  "na-hover-bg-paper-2": "hover:bg-nx-surface-well",
  "hover:na-bg-muted": "hover:bg-nx-surface-well",
  "hover:na-shadow-lg": "hover:shadow-lg",
  "na-transition": "transition",
  "na-transition-colors": "transition-colors",
  "na-transition-all": "transition-all",
  "na-transition-shadow": "transition-shadow",
  "na-cursor-pointer": "cursor-pointer",

  /* ─────────────────────────────────────────────────────────
   * SPINNER & LOADING
   * ───────────────────────────────────────────────────────── */
  "na-spinner": "animate-spin h-5 w-5 border-2 border-nx-primary border-t-transparent rounded-full",
  "na-spinner-sm": "animate-spin h-4 w-4 border-2 border-nx-primary border-t-transparent rounded-full",
  "na-spinner-lg": "animate-spin h-8 w-8 border-2 border-nx-primary border-t-transparent rounded-full",
} as const;

/* ============================================================
 * RAW TAILWIND → NEXUS SEMANTIC MAP
 * Maps forbidden raw Tailwind colors to Nexus tokens
 * ============================================================ */

export const RAW_TAILWIND_TO_NX_MAP: Record<string, string> = {
  /* ─────────────────────────────────────────────────────────
   * TEXT COLORS
   * ───────────────────────────────────────────────────────── */
  "text-gray-50": "text-nx-text-inverse",
  "text-gray-100": "text-nx-text-inverse",
  "text-gray-200": "text-nx-text-muted",
  "text-gray-300": "text-nx-text-muted",
  "text-gray-400": "text-nx-text-faint",
  "text-gray-500": "text-nx-text-muted",
  "text-gray-600": "text-nx-text-sub",
  "text-gray-700": "text-nx-text-sub",
  "text-gray-900": "text-nx-text-main",
  "text-neutral-500": "text-nx-text-muted",
  "text-neutral-900": "text-nx-text-main",
  "text-blue-400": "text-nx-info",
  "text-green-400": "text-nx-success",
  "text-red-400": "text-nx-danger",
  "text-purple-400": "text-nx-primary",
  "text-yellow-400": "text-nx-warning",
  "text-yellow-500": "text-nx-warning",
  "text-orange-400": "text-nx-warning",
  "hover:text-yellow-400": "hover:text-nx-warning",

  /* ─────────────────────────────────────────────────────────
   * BACKGROUND COLORS
   * ───────────────────────────────────────────────────────── */
  "bg-white": "bg-nx-surface",
  "bg-gray-50": "bg-nx-canvas",
  "bg-gray-100": "bg-nx-surface-well",
  "bg-gray-200": "bg-nx-surface-well",
  "bg-gray-500": "bg-nx-secondary",
  "bg-gray-500/10": "bg-nx-surface-well",
  "bg-blue-500": "bg-nx-info",
  "bg-blue-500/10": "bg-nx-info-bg",
  "bg-cyan-500/10": "bg-nx-info-bg",
  "bg-green-500": "bg-nx-success",
  "bg-green-500/10": "bg-nx-success-bg",
  "bg-yellow-500": "bg-nx-warning",
  "bg-yellow-500/10": "bg-nx-warning-bg",
  "bg-orange-500": "bg-nx-warning",
  "bg-red-500": "bg-nx-danger",
  "bg-red-500/10": "bg-nx-danger-bg",
  "bg-purple-500/10": "bg-nx-primary-light",
  "bg-neutral-50": "bg-nx-canvas",

  /* ─────────────────────────────────────────────────────────
   * BORDER COLORS
   * ───────────────────────────────────────────────────────── */
  "border-gray-100": "border-nx-border",
  "border-gray-200": "border-nx-border",
  "border-gray-300": "border-nx-border-strong",
  "border-neutral-300": "border-nx-border-strong",

  /* ─────────────────────────────────────────────────────────
   * HOVER STATES
   * ───────────────────────────────────────────────────────── */
  "hover:bg-gray-50": "hover:bg-nx-surface-well",
  "hover:bg-gray-100": "hover:bg-nx-surface-well",
  "hover:bg-gray-200": "hover:bg-nx-surface-well",
  "hover:bg-neutral-50": "hover:bg-nx-surface-well",
  "hover:bg-red-600": "hover:bg-nx-danger-text",
  "hover:text-gray-300": "hover:text-nx-text-muted",
  "hover:text-red-300": "hover:text-nx-danger",
  "hover:text-red-400": "hover:text-nx-danger",
} as const;

/* ============================================================
 * IMPORT REPLACEMENT MAP
 * Maps legacy imports to Nexus equivalents
 * ============================================================ */

export const IMPORT_REPLACEMENT_MAP: Record<string, string> = {
  "@aibos/kernel": "@nexus/kernel",
  "aibos-design-system": "@nexus/kernel",
} as const;

/* ============================================================
 * SPECIAL PATTERNS — Require context-aware replacement
 * ============================================================ */

export const CONTEXTUAL_PATTERNS: Record<string, { pattern: RegExp; replacement: string }> = {
  /* Status class combinations */
  "na-status-pending": {
    pattern: /na-status na-status-pending/g,
    replacement: "badge badge-info",
  },
  "na-status-ok": {
    pattern: /na-status na-status-ok/g,
    replacement: "badge badge-success",
  },
  "na-status-bad": {
    pattern: /na-status na-status-bad/g,
    replacement: "badge badge-danger",
  },
  "na-status-warn": {
    pattern: /na-status na-status-warn/g,
    replacement: "badge badge-warning",
  },
  /* Text color with neutral reference */
  "na-text-neutral-3": {
    pattern: /na-text-neutral-3/g,
    replacement: "text-nx-text-muted",
  },
  /* Dynamic status classes */
  "status-dynamic-ok": {
    pattern: /na-status-\$\{[^}]+\s*===\s*['"]open['"]\s*\?\s*['"]pending['"]/g,
    replacement: "badge-${'open' === status ? 'info'",
  },
} as const;

/* ============================================================
 * VALIDATION — Ensure all targets exist
 * ============================================================ */

export const VALID_NX_CLASSES = [
  // Semantic colors
  "bg-nx-surface", "bg-nx-surface-well", "bg-nx-canvas", "bg-nx-raised", "bg-nx-overlay",
  "bg-nx-primary", "bg-nx-primary-hover", "bg-nx-primary-light",
  "bg-nx-secondary", "bg-nx-secondary-hover",
  "bg-nx-success", "bg-nx-success-bg",
  "bg-nx-warning", "bg-nx-warning-bg",
  "bg-nx-danger", "bg-nx-danger-bg",
  "bg-nx-info", "bg-nx-info-bg",
  "text-nx-text-main", "text-nx-text-sub", "text-nx-text-muted", "text-nx-text-faint", "text-nx-text-inverse",
  "text-nx-primary", "text-nx-success", "text-nx-warning", "text-nx-danger", "text-nx-info",
  "border-nx-border", "border-nx-border-strong", "border-nx-primary",
  "border-nx-danger", "border-l-nx-primary",
  "hover:bg-nx-surface-well", "hover:bg-nx-ghost-hover", "hover:bg-nx-danger-text",
  "hover:text-nx-danger", "hover:text-nx-text-muted",
  // Primitives (for exceptional cases)
  "bg-nx-red-700",
  // Component classes
  "card", "card-raised", "btn-primary", "btn-secondary", "input",
  "badge", "badge-success", "badge-warning", "badge-danger", "badge-info", "badge-neutral",
  "shell", "section", "title", "caption",
  "table-professional", "table-header-cell", "table-row", "table-data-cell",
] as const;
