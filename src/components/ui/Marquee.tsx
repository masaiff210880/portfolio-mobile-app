import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

/**
 * Seamless infinite marquee. Renders the row twice and translates by one
 * set's width so the loop is invisible. `reverse` scrolls the other way.
 */
export function Marquee<T>({
  items,
  renderItem,
  reverse = false,
  speed = 40,
  gap = 12,
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  reverse?: boolean;
  speed?: number;
  gap?: number;
}) {
  const [setWidth, setSetWidth] = useState(0);
  const translate = useSharedValue(0);

  useEffect(() => {
    if (!setWidth) return;
    const duration = (setWidth / speed) * 1000;
    translate.value = 0;
    translate.value = withRepeat(
      withTiming(-setWidth, { duration, easing: Easing.linear }),
      -1,
      false,
    );
    return () => cancelAnimation(translate);
  }, [setWidth, speed, translate]);

  const style = useAnimatedStyle(() => {
    const x = reverse ? -setWidth - translate.value : translate.value;
    return { transform: [{ translateX: x }] };
  });

  return (
    <View className="overflow-hidden">
      <Animated.View style={[{ flexDirection: "row" }, style]}>
        <View
          style={{ flexDirection: "row", gap }}
          onLayout={(e) => setSetWidth(e.nativeEvent.layout.width + gap)}
        >
          {items.map((item, i) => (
            <View key={`a-${i}`}>{renderItem(item, i)}</View>
          ))}
        </View>
        <View style={{ flexDirection: "row", gap, marginLeft: gap }}>
          {items.map((item, i) => (
            <View key={`b-${i}`}>{renderItem(item, i)}</View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
