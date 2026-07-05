import { type ViewProps } from "react-native";

import { cn } from "@/lib/cn";
import { Glass } from "./Glass";

/** Elevated glass content card. */
export function Card({
  className,
  children,
  style,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <Glass
      className={cn("rounded-2xl p-6", className)}
      style={style}
      {...props}
    >
      {children}
    </Glass>
  );
}
