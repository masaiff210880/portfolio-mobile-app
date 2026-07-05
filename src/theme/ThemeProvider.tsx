import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { View } from "react-native";
import { vars } from "nativewind";

import {
  GLASS,
  PALETTES,
  withAlpha,
  type GlassKey,
  type Mode,
  type Palette,
  type ThemeKey,
} from "./palettes";
import { siteConfig } from "@/data/config";

type ThemeContextValue = {
  theme: ThemeKey;
  mode: Mode;
  glass: GlassKey;
  isDark: boolean;
  colors: Palette;
  /** Frosted-glass helper values derived from the active glass style. */
  glassStyle: { blur: number; surface: string; card: string; border: string };
  setTheme: (t: ThemeKey) => void;
  setGlass: (g: GlassKey) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeKey>(siteConfig.defaultTheme);
  const [mode, setMode] = useState<Mode>(siteConfig.defaultMode);
  const [glass, setGlass] = useState<GlassKey>(siteConfig.defaultGlass);

  const colors = PALETTES[theme][mode];

  const cssVars = useMemo(
    () =>
      vars({
        "--bg": colors.bg,
        "--bg-soft": colors["bg-soft"],
        "--surface": colors.surface,
        "--surface-2": colors["surface-2"],
        "--border": colors.border,
        "--text": colors.text,
        "--text-muted": colors["text-muted"],
        "--primary": colors.primary,
        "--primary-hover": colors["primary-hover"],
        "--primary-fg": colors["primary-fg"],
        "--secondary": colors.secondary,
        "--accent": colors.accent,
      }),
    [colors],
  );

  const value = useMemo<ThemeContextValue>(() => {
    const g = GLASS[glass];
    return {
      theme,
      mode,
      glass,
      isDark: mode === "dark",
      colors,
      glassStyle: {
        blur: g.blur,
        surface: withAlpha(colors.surface, g.surface),
        card: withAlpha(colors.surface, g.card),
        border: withAlpha(colors.border, g.border),
      },
      setTheme,
      setGlass,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
    };
  }, [theme, mode, glass, colors]);

  return (
    <ThemeContext.Provider value={value}>
      <View style={[{ flex: 1, backgroundColor: colors.bg }, cssVars]}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
