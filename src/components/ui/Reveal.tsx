import Animated, {
  FadeInDown,
  type AnimatedProps,
} from "react-native-reanimated";
import { type ViewProps } from "react-native";

/**
 * Scroll/entrance reveal — fades + rises into place, mirroring the desktop
 * `fadeUp` framer-motion variant. `delay` staggers siblings.
 */
export function Reveal({
  delay = 0,
  duration = 600,
  children,
  ...props
}: AnimatedProps<ViewProps> & { delay?: number; duration?: number }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(duration)}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
