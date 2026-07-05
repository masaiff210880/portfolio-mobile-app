import { useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/theme/ThemeProvider";

/** Animated skill bar that fills to `value`% on mount. */
export function ProgressBar({
  value = 0,
  delay = 0,
}: {
  value?: number;
  delay?: number;
}) {
  const { colors } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(value, { duration: 1000 }));
  }, [value, delay, progress]);

  const style = useAnimatedStyle(() => ({ width: `${progress.value}%` }));

  return (
    <View className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
      <Animated.View
        style={style}
        className="h-full overflow-hidden rounded-full"
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}
