import { Pressable, Text, View, type PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import type { LucideIcon } from "lucide-react-native";

import { cn } from "@/lib/cn";
import { useTheme } from "@/theme/ThemeProvider";

type Variant = "primary" | "outline" | "ghost" | "soft";
type Size = "sm" | "md" | "lg";

const containerVariants: Record<Variant, string> = {
  primary: "bg-primary border border-transparent",
  outline: "bg-transparent border border-border",
  ghost: "bg-transparent border border-transparent",
  soft: "bg-surface-2 border border-border",
};

const textVariants: Record<Variant, string> = {
  primary: "text-primary-fg",
  outline: "text-content",
  ghost: "text-muted",
  soft: "text-content",
};

const sizeVariants: Record<Size, string> = {
  sm: "px-4 py-2 gap-1.5",
  md: "px-5 py-2.5 gap-2",
  lg: "px-7 py-3.5 gap-2.5",
};

const textSize: Record<Size, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};
const iconSize: Record<Size, number> = { sm: 16, md: 18, lg: 20 };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  onPress,
  disabled,
  ...props
}: PressableProps & {
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  fullWidth?: boolean;
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconColor =
    variant === "primary"
      ? colors["primary-fg"]
      : variant === "outline"
        ? colors.text
        : colors["text-muted"];

  return (
    <Animated.View
      style={[
        animStyle,
        variant === "primary" && {
          shadowColor: colors.primary,
          shadowOpacity: 0.45,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 6,
        },
        disabled && { opacity: 0.6 },
      ]}
      className={cn(
        "overflow-hidden rounded-xl",
        containerVariants[variant],
        fullWidth && "w-full",
        className,
      )}
    >
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={onPress}
        disabled={disabled}
        className={cn(
          "flex-row items-center justify-center",
          sizeVariants[size],
        )}
        {...props}
      >
        {Icon && <Icon size={iconSize[size]} color={iconColor} />}
        {typeof children === "string" ? (
          <Text
            className={cn(
              "font-semibold",
              textVariants[variant],
              textSize[size],
            )}
          >
            {children}
          </Text>
        ) : (
          <View>{children}</View>
        )}
        {IconRight && <IconRight size={iconSize[size]} color={iconColor} />}
      </Pressable>
    </Animated.View>
  );
}
