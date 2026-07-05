import { useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { ArrowUpRight, Download, Lock } from "lucide-react-native";

import { Glass } from "@/components/ui/Glass";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data/data";
import { GithubIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { useTheme } from "@/theme/ThemeProvider";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "desktop", label: "Desktop" },
] as const;

const open = (url?: string | null) =>
  url && Linking.openURL(url).catch(() => {});

function ProjectCard({ project }: { project: Project }) {
  const { colors } = useTheme();
  const Icon = project.icon;
  return (
    <Animated.View entering={FadeIn.duration(350)} layout={LinearTransition}>
      <Glass className="rounded-2xl p-6">
        <View className="mb-5 flex-row items-start justify-between">
          <View className="size-12 items-center justify-center rounded-xl bg-surface-2">
            <Icon size={24} color={colors.primary} />
          </View>
          <View className="flex-row items-center gap-2">
            {project.source ? (
              <Pressable
                onPress={() => open(project.source)}
                className="size-9 items-center justify-center rounded-lg border border-border"
              >
                <GithubIcon size={16} color={colors["text-muted"]} />
              </Pressable>
            ) : null}
            {project.live ? (
              <Pressable
                onPress={() => open(project.live)}
                className="size-9 items-center justify-center rounded-lg border border-border"
              >
                <ArrowUpRight size={16} color={colors["text-muted"]} />
              </Pressable>
            ) : null}
            {!project.source && !project.live && !project.download ? (
              <View className="flex-row items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5">
                <Lock size={14} color={colors["text-muted"]} />
                <Text className="text-xs font-medium text-muted">Private</Text>
              </View>
            ) : null}
          </View>
        </View>

        <Text className="text-xl font-semibold text-content">
          {project.title}
        </Text>
        <Text className="mt-2 text-sm leading-5 text-muted">
          {project.description}
        </Text>

        <View className="mt-5 flex-row flex-wrap gap-2">
          {project.tags.map((tag) => (
            <View
              key={tag}
              className="rounded-full border border-border bg-surface-2 px-3 py-1"
            >
              <Text className="text-xs font-medium text-muted">{tag}</Text>
            </View>
          ))}
        </View>

        {project.download ? (
          <Pressable
            onPress={() => open(project.download)}
            style={{
              shadowColor: colors.primary,
              shadowOpacity: 0.45,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 6 },
              elevation: 5,
            }}
            className="mt-5 flex-row items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5"
          >
            <Download size={16} color={colors["primary-fg"]} />
            <Text className="text-sm font-semibold text-primary-fg">
              Download app
            </Text>
          </Pressable>
        ) : null}
      </Glass>
    </Animated.View>
  );
}

export function Projects() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const countFor = (key: string) =>
    key === "all"
      ? projects.length
      : projects.filter((p) => p.category === key).length;

  return (
    <Section>
      <SectionHeading
        eyebrow="Projects"
        title="Selected work I'm proud of"
        subtitle="Web, mobile and desktop products I've designed and shipped."
      />

      {/* Filter tabs */}
      <View className="mt-8 flex-row flex-wrap justify-center gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={active ? { backgroundColor: colors.primary } : undefined}
              className={cn(
                "flex-row items-center rounded-full px-4 py-2",
                !active && "bg-transparent",
              )}
            >
              <Text
                className={cn(
                  "text-sm font-medium",
                  active ? "text-primary-fg" : "text-muted",
                )}
              >
                {f.label}
              </Text>
              <Text
                className={cn(
                  "ml-1.5 text-xs",
                  active ? "text-primary-fg" : "text-muted",
                )}
                style={{ opacity: active ? 0.8 : 0.6 }}
              >
                {countFor(f.key)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Animated.View layout={LinearTransition} className="mt-10 gap-6">
        {filtered.map((project, i) => (
          <Reveal key={project.title} delay={i * 60}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </Animated.View>
    </Section>
  );
}
