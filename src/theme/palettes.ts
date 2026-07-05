/**
 * THEME PALETTES — 5 white-label themes, each with light + dark.
 * Ported 1:1 from the desktop app's main.css so the mobile UI matches.
 */

export type ThemeKey = "aurora" | "emerald" | "sunset" | "ocean" | "rose";
export type Mode = "light" | "dark";
export type GlassKey = "frosted" | "liquid" | "clear" | "tinted" | "solid";

export type Palette = {
  bg: string;
  "bg-soft": string;
  surface: string;
  "surface-2": string;
  border: string;
  text: string;
  "text-muted": string;
  primary: string;
  "primary-hover": string;
  "primary-fg": string;
  secondary: string;
  accent: string;
};

export const PALETTES: Record<ThemeKey, Record<Mode, Palette>> = {
  aurora: {
    dark: {
      bg: "#0b0b16",
      "bg-soft": "#12122a",
      surface: "#16162b",
      "surface-2": "#1e1e3a",
      border: "#2a2a4a",
      text: "#ececff",
      "text-muted": "#cfcfec",
      primary: "#7c5cff",
      "primary-hover": "#6a48f5",
      "primary-fg": "#ffffff",
      secondary: "#22d3ee",
      accent: "#f472b6",
    },
    light: {
      bg: "#f6f6ff",
      "bg-soft": "#ffffff",
      surface: "#ffffff",
      "surface-2": "#f0f0fb",
      border: "#e2e2f5",
      text: "#16162b",
      "text-muted": "#3d3d56",
      primary: "#6a48f5",
      "primary-hover": "#5636e0",
      "primary-fg": "#ffffff",
      secondary: "#0891b2",
      accent: "#db2777",
    },
  },
  emerald: {
    dark: {
      bg: "#06120f",
      "bg-soft": "#0a1f18",
      surface: "#0c2019",
      "surface-2": "#123328",
      border: "#1c4a3a",
      text: "#e6fff5",
      "text-muted": "#cbeede",
      primary: "#10d98f",
      "primary-hover": "#0bbd7c",
      "primary-fg": "#04231a",
      secondary: "#38bdf8",
      accent: "#a3e635",
    },
    light: {
      bg: "#f0fdf7",
      "bg-soft": "#ffffff",
      surface: "#ffffff",
      "surface-2": "#e7fbf1",
      border: "#cdeede",
      text: "#05271d",
      "text-muted": "#274539",
      primary: "#059669",
      "primary-hover": "#047857",
      "primary-fg": "#ffffff",
      secondary: "#0284c7",
      accent: "#65a30d",
    },
  },
  sunset: {
    dark: {
      bg: "#16090a",
      "bg-soft": "#24100f",
      surface: "#271211",
      "surface-2": "#391a18",
      border: "#4d2523",
      text: "#fff0ec",
      "text-muted": "#f0d4cd",
      primary: "#ff6a3d",
      "primary-hover": "#f2542d",
      "primary-fg": "#200806",
      secondary: "#ffb020",
      accent: "#ff4d6d",
    },
    light: {
      bg: "#fff6f2",
      "bg-soft": "#ffffff",
      surface: "#ffffff",
      "surface-2": "#ffece4",
      border: "#ffd7c9",
      text: "#33130d",
      "text-muted": "#5e3729",
      primary: "#ea580c",
      "primary-hover": "#c2410c",
      "primary-fg": "#ffffff",
      secondary: "#d97706",
      accent: "#e11d48",
    },
  },
  ocean: {
    dark: {
      bg: "#061019",
      "bg-soft": "#0a1c2e",
      surface: "#0b1f33",
      "surface-2": "#122d47",
      border: "#1d4160",
      text: "#e7f4ff",
      "text-muted": "#ccdff0",
      primary: "#38a3ff",
      "primary-hover": "#1e8ef0",
      "primary-fg": "#04121f",
      secondary: "#22d3ee",
      accent: "#818cf8",
    },
    light: {
      bg: "#f0f8ff",
      "bg-soft": "#ffffff",
      surface: "#ffffff",
      "surface-2": "#e4f1fc",
      border: "#cbe3f7",
      text: "#06253d",
      "text-muted": "#2c405c",
      primary: "#0284c7",
      "primary-hover": "#0369a1",
      "primary-fg": "#ffffff",
      secondary: "#0891b2",
      accent: "#6366f1",
    },
  },
  rose: {
    dark: {
      bg: "#14060f",
      "bg-soft": "#230c1c",
      surface: "#260d1f",
      "surface-2": "#38152e",
      border: "#4d1f40",
      text: "#ffecf7",
      "text-muted": "#f0d2e6",
      primary: "#ff5ca8",
      "primary-hover": "#f43f96",
      "primary-fg": "#22060f",
      secondary: "#c084fc",
      accent: "#fb7185",
    },
    light: {
      bg: "#fff5fa",
      "bg-soft": "#ffffff",
      surface: "#ffffff",
      "surface-2": "#ffe6f1",
      border: "#ffcfe3",
      text: "#3a0c26",
      "text-muted": "#5e3149",
      primary: "#db2777",
      "primary-hover": "#be185d",
      "primary-fg": "#ffffff",
      secondary: "#9333ea",
      accent: "#e11d48",
    },
  },
};

/** Theme metadata for the switcher swatches. */
export const THEMES: {
  key: ThemeKey;
  name: string;
  description: string;
  swatch: [string, string, string];
}[] = [
  {
    key: "aurora",
    name: "Aurora",
    description: "Indigo & violet",
    swatch: ["#7c5cff", "#22d3ee", "#f472b6"],
  },
  {
    key: "emerald",
    name: "Emerald",
    description: "Green & teal",
    swatch: ["#10d98f", "#38bdf8", "#a3e635"],
  },
  {
    key: "sunset",
    name: "Sunset",
    description: "Orange & rose",
    swatch: ["#ff6a3d", "#ffb020", "#ff4d6d"],
  },
  {
    key: "ocean",
    name: "Ocean",
    description: "Blue & cyan",
    swatch: ["#38a3ff", "#22d3ee", "#818cf8"],
  },
  {
    key: "rose",
    name: "Rose",
    description: "Pink & fuchsia",
    swatch: ["#ff5ca8", "#c084fc", "#fb7185"],
  },
];

/**
 * GLASS STYLES — surface/border opacity + blur amount used to render the
 * frosted-glass cards. Values approximate the desktop CSS glass tokens.
 */
export const GLASS: Record<
  GlassKey,
  { blur: number; surface: number; card: number; border: number }
> = {
  frosted: { blur: 14, surface: 0.86, card: 0.9, border: 0.75 },
  liquid: { blur: 26, surface: 0.7, card: 0.76, border: 0.6 },
  clear: { blur: 7, surface: 0.55, card: 0.62, border: 0.48 },
  tinted: { blur: 16, surface: 0.94, card: 0.96, border: 0.88 },
  solid: { blur: 0, surface: 1, card: 1, border: 1 },
};

export const GLASS_STYLES: {
  key: GlassKey;
  name: string;
  description: string;
}[] = [
  {
    key: "frosted",
    name: "Frosted",
    description: "Balanced blur — the classic look",
  },
  {
    key: "liquid",
    name: "Liquid",
    description: "Heavy blur & vivid saturation",
  },
  { key: "clear", name: "Clear", description: "Light, see-through glass" },
  { key: "tinted", name: "Tinted", description: "Rich, tinted, more opaque" },
  { key: "solid", name: "Solid", description: "No blur — best readability" },
];

/** Convert a #rrggbb hex + alpha (0..1) to an rgba() string. */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
