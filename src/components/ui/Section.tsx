import { View, type ViewProps } from "react-native";

import { cn } from "@/lib/cn";

/** Full-width section wrapper with consistent vertical spacing + max width. */
export function Section({
  className,
  children,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View className={cn("w-full px-5 py-14", className)} {...props}>
      <View className="mx-auto w-full max-w-3xl">{children}</View>
    </View>
  );
}
