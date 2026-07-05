import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, type TextProps } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

/**
 * Text painted with the theme's primary→secondary→accent gradient,
 * mirroring the desktop `.text-gradient` helper.
 */
export function GradientText({ style, children, ...props }: TextProps) {
  const { colors } = useTheme();
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: "transparent" }]} {...props}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={[colors.primary, colors.secondary, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[style, { opacity: 0 }]} {...props}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}

/** Convenience wrapper for a gradient-filled decorative box. */
export function GradientBox({
  colors: override,
  style,
  children,
}: {
  colors?: [string, string, ...string[]];
  style?: any;
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={override ?? [colors.primary, colors.secondary, colors.accent]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      <View>{children}</View>
    </LinearGradient>
  );
}
