import { Text, View } from "react-native";

import { Glass } from "@/components/ui/Glass";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/data";
import { useTheme } from "@/theme/ThemeProvider";

export function Skills() {
  const { colors } = useTheme();
  return (
    <Section className="bg-bg-soft">
      <SectionHeading
        eyebrow="Skills"
        title="A versatile, modern toolkit"
        subtitle="From pixels to pipelines — the technologies I use to bring products to life."
      />

      <View className="mt-10 gap-5">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 80}>
            <Glass className="rounded-2xl p-5">
              <View className="mb-4 flex-row items-center gap-2.5">
                <View className="size-9 items-center justify-center rounded-lg bg-surface-2">
                  <group.icon size={20} color={colors.primary} />
                </View>
                <Text
                  numberOfLines={1}
                  className="flex-1 text-base font-semibold text-content"
                >
                  {group.title}
                </Text>
              </View>
              <View className="gap-2.5">
                {group.skills.map((skill, si) => (
                  <View key={skill.name}>
                    <View className="mb-1 flex-row items-center justify-between">
                      <Text
                        numberOfLines={1}
                        className="flex-1 pr-2 text-xs font-medium text-content"
                      >
                        {skill.name}
                      </Text>
                      <Text className="text-xs text-muted">{skill.level}%</Text>
                    </View>
                    <ProgressBar value={skill.level} delay={si * 60} />
                  </View>
                ))}
              </View>
            </Glass>
          </Reveal>
        ))}
      </View>
    </Section>
  );
}
