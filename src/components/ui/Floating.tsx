import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { type ViewProps } from "react-native";

/** Wraps children in a gentle infinite vertical bob (the desktop `float`). */
export function Floating({
  amplitude = 10,
  duration = 4000,
  delay = 0,
  style,
  children,
  ...props
}: ViewProps & { amplitude?: number; duration?: number; delay?: number }) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-1, {
            duration: duration / 2,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, {
            duration: duration / 2,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        true,
      ),
    );
  }, [t, duration, delay]);

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: t.value * amplitude }],
  }));

  return (
    <Animated.View style={[style, aStyle]} {...props}>
      {children}
    </Animated.View>
  );
}
