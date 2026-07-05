import { Text, View } from "react-native";

import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/data";
import { useTheme } from "@/theme/ThemeProvider";

export function Experience() {
  const { colors } = useTheme();
  return (
    <Section className="bg-bg-soft">
      <SectionHeading
        eyebrow="Experience"
        title="My professional journey"
        subtitle="Roles where I've grown, led and shipped meaningful work."
      />

      <View className="mt-10">
        {/* vertical line */}
        <View
          style={{ backgroundColor: colors.border }}
          className="absolute bottom-2 left-[7px] top-2 w-px"
        />

        {experience.map((item, i) => (
          <Reveal key={item.company} delay={i * 100}>
            <View className="relative mb-8 pl-9">
              {/* node */}
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  top: 8,
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: colors.primary,
                  borderWidth: 4,
                  borderColor: colors["bg-soft"],
                }}
              />
              <Glass className="rounded-2xl p-6">
                <Text className="text-sm font-medium text-primary">
                  {item.period}
                </Text>
                <Text className="mt-1 text-lg font-semibold text-content">
                  {item.role}
                </Text>
                <Text className="text-sm font-medium text-muted">
                  {item.company}
                  {item.location ? ` · ${item.location}` : ""}
                </Text>
                <Text className="mt-3 text-sm leading-5 text-muted">
                  {item.description}
                </Text>
                <View className="mt-4 flex-row flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <View
                      key={tag}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1"
                    >
                      <Text className="text-xs font-medium text-muted">
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </Glass>
            </View>
          </Reveal>
        ))}
      </View>
    </Section>
  );
}
