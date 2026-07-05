import { Text, View } from "react-native";

import { cn } from "@/lib/cn";

/** Small pill label with an optional leading dot. */
export function Badge({
  children,
  className,
  dot = false,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <View
      className={cn(
        "flex-row items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1",
        className,
      )}
    >
      {dot && <View className="size-1.5 rounded-full bg-primary" />}
      <Text numberOfLines={1} className="text-xs font-medium text-muted">
        {children}
      </Text>
    </View>
  );
}
