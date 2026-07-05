import { ScrollView, View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/theme/ThemeProvider";
import { AnimatedBackground } from "./AnimatedBackground";

/**
 * Themed, scrollable screen shell used by every tab. Provides the animated
 * background, safe-area padding, and clearance for the floating top controls
 * and bottom tab bar.
 */
export function Screen({
  children,
  extraTop = 0,
  ...props
}: ViewProps & { extraTop?: number }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }} {...props}>
      <AnimatedBackground />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 12 + extraTop,
          paddingBottom: insets.bottom + 110,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
}
