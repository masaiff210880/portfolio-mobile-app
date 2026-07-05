import { useState } from "react";
import { View, type ViewProps } from "react-native";
import { Image } from "expo-image";

import { siteConfig } from "@/data/config";
import { cn } from "@/lib/cn";
import { GradientText } from "./GradientText";

const PROFILE_IMAGE = require("@/assets/images/profile.png");

/**
 * Brand mark — the profile photo, with a gradient-initials fallback if the
 * image can't load. Mirrors the desktop `ProfileMark`.
 */
export function ProfileMark({
  className,
  fontSize = 32,
  style,
  ...props
}: ViewProps & { className?: string; fontSize?: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <View
      className={cn(
        "items-center justify-center overflow-hidden rounded-full bg-surface-2",
        className,
      )}
      style={style}
      {...props}
    >
      {failed ? (
        <GradientText
          style={{ fontSize, fontWeight: "900", lineHeight: fontSize * 1.1 }}
        >
          {siteConfig.logoInitials}
        </GradientText>
      ) : (
        <Image
          source={PROFILE_IMAGE}
          onError={() => setFailed(true)}
          contentFit="cover"
          contentPosition="top"
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </View>
  );
}
