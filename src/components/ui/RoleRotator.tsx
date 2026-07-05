import { useEffect, useState } from "react";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

import { GradientText } from "./GradientText";

/**
 * Cycles through a list of words, rolling each up and out while the next
 * rolls in — a mobile take on the desktop `RoleRotator`.
 */
export function RoleRotator({
  roles,
  interval = 2200,
  fontSize = 20,
}: {
  roles: string[];
  interval?: number;
  fontSize?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!roles?.length) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      interval,
    );
    return () => clearInterval(id);
  }, [roles, interval]);

  return (
    <Animated.View
      key={roles[index]}
      entering={FadeInDown.duration(450)}
      exiting={FadeOutUp.duration(450)}
    >
      <GradientText style={{ fontSize, fontWeight: "800" }}>
        {roles[index]}
      </GradientText>
    </Animated.View>
  );
}
