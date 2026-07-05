import { View, type ViewProps } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

/**
 * Frosted-glass surface. Uses the active glass style's translucency + border
 * over the themed background to mimic the desktop `.glass` / `.glass-card`.
 */
export function Glass({
  variant = "card",
  style,
  children,
  ...props
}: ViewProps & { variant?: "glass" | "card" }) {
  const { glassStyle } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor:
            variant === "glass" ? glassStyle.surface : glassStyle.card,
          borderColor: glassStyle.border,
          borderWidth: 1,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
