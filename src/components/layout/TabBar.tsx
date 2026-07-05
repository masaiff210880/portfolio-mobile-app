import { Pressable, View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  Briefcase,
  Code2,
  Home,
  LayoutGrid,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react-native";

import { Glass } from "@/components/ui/Glass";
import { withAlpha } from "@/theme/palettes";
import { useTheme } from "@/theme/ThemeProvider";

const META: Record<string, { icon: LucideIcon; label: string }> = {
  index: { icon: Home, label: "Home" },
  about: { icon: User, label: "About" },
  skills: { icon: Code2, label: "Skills" },
  projects: { icon: LayoutGrid, label: "Projects" },
  experience: { icon: Briefcase, label: "Experience" },
  contact: { icon: Mail, label: "Contact" },
};

/** Custom floating glass tab bar with an expanding active pill. */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        bottom: insets.bottom + 8,
        zIndex: 55,
      }}
    >
      <Glass
        variant="glass"
        className="flex-row items-center justify-between rounded-3xl px-1.5 py-1.5"
      >
        {state.routes.map((route, index) => {
          const meta = META[route.name];
          if (!meta) return null;
          const Icon = meta.icon;
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="items-center justify-center"
            >
              <Animated.View
                layout={LinearTransition.springify().damping(18)}
                style={
                  focused
                    ? { backgroundColor: withAlpha(colors.primary, 0.16) }
                    : undefined
                }
                className="flex-row items-center gap-1 rounded-full px-2.5 py-2"
              >
                <Icon
                  size={19}
                  color={focused ? colors.primary : colors["text-muted"]}
                />
                {focused ? (
                  <Animated.Text
                    entering={FadeIn.duration(180)}
                    numberOfLines={1}
                    style={{ color: colors.primary, fontSize: 11 }}
                    className="font-semibold"
                  >
                    {meta.label}
                  </Animated.Text>
                ) : null}
              </Animated.View>
            </Pressable>
          );
        })}
      </Glass>
    </View>
  );
}
