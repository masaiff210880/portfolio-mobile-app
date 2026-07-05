import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/theme/ThemeProvider";
import { withAlpha } from "@/theme/palettes";

/** A single softly-drifting color blob. */
function Blob({
  color,
  size,
  style,
  delay = 0,
}: {
  color: string;
  size: number;
  style: object;
  delay?: number;
}) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [t]);

  const aStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: t.value * 30 - 15 },
      { translateY: t.value * -24 + 12 },
      { scale: 1 + t.value * 0.12 },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity: 0.22,
        },
        style,
        aStyle,
      ]}
    />
  );
}

/** Decorative fixed background: drifting themed color blobs. */
export function AnimatedBackground() {
  const { colors } = useTheme();
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Blob
        color={withAlpha(colors.primary, 0.25)}
        size={420}
        style={{ top: -120, left: -100 }}
      />
      <Blob
        color={withAlpha(colors.secondary, 0.22)}
        size={380}
        style={{ top: "32%", right: -120 }}
        delay={2000}
      />
      <Blob
        color={withAlpha(colors.accent, 0.2)}
        size={400}
        style={{ bottom: -140, left: "28%" }}
        delay={4000}
      />
    </View>
  );
}
