import { Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/config";
import { stats } from "@/data/data";
import { useTheme } from "@/theme/ThemeProvider";

const TAGS = [
  "Clean, scalable code",
  "Performance-first",
  "Reusable components",
  "Cross-platform",
  "Team player",
  "Team Lead",
  "Code Review",
  "Client Handling",
  "Performance Optimization",
  "Agile / Scrum",
  "Mentoring",
  "Responsive & Accessible UI",
];

export function About() {
  const { colors } = useTheme();
  return (
    <Section>
      <SectionHeading
        eyebrow="About me"
        title="Frontend Developer crafting fast, reliable products"
        subtitle="3 years turning ideas into production-grade web, mobile and desktop applications."
      />

      <View className="mt-10 gap-10">
        <Reveal>
          <View className="gap-5">
            <Text className="text-base leading-6 text-muted">
              I&apos;m {siteConfig.owner.name}, a Frontend Developer with 3
              years of hands-on experience designing and shipping
              high-performance web, mobile and desktop applications. I work
              primarily across the React ecosystem — React.js, Next.js, React
              Native and Electron.js — building responsive, accessible and
              pixel-perfect user interfaces.
            </Text>
            <Text className="text-base leading-6 text-muted">
              I care about clean, maintainable code, reusable component systems,
              performance and smooth micro-interactions. Comfortable across the
              full MERN stack, I collaborate closely with designers and backend
              engineers to deliver polished features end to end.
            </Text>
            <View className="flex-row flex-wrap gap-2 pt-2">
              {TAGS.map((t) => (
                <View
                  key={t}
                  className="rounded-full border border-border bg-surface-2 px-3.5 py-1.5"
                >
                  <Text className="text-sm text-content">{t}</Text>
                </View>
              ))}
            </View>
          </View>
        </Reveal>

        <View className="flex-row flex-wrap gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} style={{ width: "47%" }}>
              <Card className="items-center">
                <s.icon size={28} color={colors.primary} />
                <View className="mt-3">
                  <GradientText
                    style={{
                      fontSize: 30,
                      fontWeight: "800",
                      textAlign: "center",
                    }}
                  >
                    {s.value}
                  </GradientText>
                </View>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.6}
                  className="mt-1 text-center text-sm text-muted"
                >
                  {s.label}
                </Text>
              </Card>
            </Reveal>
          ))}
        </View>
      </View>
    </Section>
  );
}
