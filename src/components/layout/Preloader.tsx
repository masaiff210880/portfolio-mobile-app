import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { ProfileMark } from "@/components/ui/ProfileMark";
import { siteConfig } from "@/data/config";
import { useTheme } from "@/theme/ThemeProvider";
import { withAlpha } from "@/theme/palettes";

const DURATION = 3400;
const TECHS = ["React.js", "Next.js", "React Native", "Electron.js", "Node.js"];

export function Preloader({ onDone }: { onDone: () => void }) {
  const { colors } = useTheme();
  const spin = useSharedValue(0);
  const spinRev = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(360, { duration: 8000, easing: Easing.linear }),
      -1,
    );
    spinRev.value = withRepeat(
      withTiming(-360, { duration: 6000, easing: Easing.linear }),
      -1,
    );
    progress.value = withTiming(
      100,
      { duration: DURATION, easing: Easing.out(Easing.cubic) },
      (f) => {
        if (f) runOnJS(onDone)();
      },
    );
  }, [spin, spinRev, progress, onDone]);

  const ring1 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));
  const ring2 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinRev.value}deg` }],
  }));
  const bar = useAnimatedStyle(() => ({ width: `${progress.value}%` }));

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: colors.bg, zIndex: 100 },
      ]}
      className="items-center justify-center"
    >
      <AnimatedBackground />

      <View className="items-center gap-8 px-6">
        {/* Rotating rings + brand mark */}
        <View
          style={{ width: 176, height: 176 }}
          className="items-center justify-center"
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                borderRadius: 88,
                borderWidth: 1,
                borderColor: withAlpha(colors.primary, 0.3),
              },
              ring1,
            ]}
          >
            <View
              style={{
                position: "absolute",
                top: -4,
                left: "50%",
                marginLeft: -4,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.primary,
              }}
            />
          </Animated.View>
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 20,
                left: 20,
                right: 20,
                bottom: 20,
                borderRadius: 68,
                borderWidth: 1,
                borderColor: withAlpha(colors.secondary, 0.4),
              },
              ring2,
            ]}
          >
            <View
              style={{
                position: "absolute",
                bottom: -3,
                left: "50%",
                marginLeft: -3,
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.secondary,
              }}
            />
          </Animated.View>
          <Animated.View
            entering={FadeIn.delay(200).duration(700)}
            style={{ width: 120, height: 120 }}
          >
            <ProfileMark className="h-full w-full" fontSize={48} />
          </Animated.View>
        </View>

        {/* Name */}
        <Animated.Text
          entering={FadeIn.delay(400).duration(600)}
          style={{ color: colors.text }}
          className="text-3xl font-bold tracking-tight"
        >
          {siteConfig.owner.name}
        </Animated.Text>

        <Animated.View
          entering={FadeIn.delay(600).duration(600)}
          className="items-center gap-2"
        >
          <Text numberOfLines={1} className="text-base font-semibold text-content">
            Software Engineer
          </Text>
          <Text className="max-w-xs text-center text-xs text-muted">
            Building fast, scalable web, mobile & desktop applications
          </Text>
          <View className="mt-1 flex-row flex-wrap items-center justify-center gap-2">
            {TECHS.map((t) => (
              <View
                key={t}
                className="rounded-full border border-border bg-surface-2 px-2.5 py-1"
              >
                <Text className="text-xs font-medium text-muted">{t}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Progress */}
        <Animated.View
          entering={FadeIn.delay(800).duration(600)}
          style={{ width: 256 }}
          className="items-center gap-2"
        >
          <View className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <Animated.View
              style={bar}
              className="h-full rounded-full bg-primary"
            />
          </View>
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-xs font-medium uppercase tracking-widest text-muted">
              Loading Profile
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
