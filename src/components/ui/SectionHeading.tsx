import { Text, View } from "react-native";

import { Badge } from "./Badge";
import { Reveal } from "./Reveal";

/** Consistent, animated section heading: eyebrow badge + title + subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View className="items-center gap-4">
      {eyebrow ? (
        <Reveal>
          <Badge dot>{eyebrow}</Badge>
        </Reveal>
      ) : null}
      <Reveal delay={80}>
        <Text className="text-center text-3xl font-bold tracking-tight text-content">
          {title}
        </Text>
      </Reveal>
      {subtitle ? (
        <Reveal delay={160}>
          <Text className="text-center text-base text-muted">{subtitle}</Text>
        </Reveal>
      ) : null}
    </View>
  );
}
