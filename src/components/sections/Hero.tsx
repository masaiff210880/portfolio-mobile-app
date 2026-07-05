import { useEffect } from "react";
import { Linking, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import {
  Download,
  Globe,
  MapPin,
  Monitor,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react-native";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Floating } from "@/components/ui/Floating";
import { Glass } from "@/components/ui/Glass";
import { GradientText } from "@/components/ui/GradientText";
import { Marquee } from "@/components/ui/Marquee";
import { ProfileMark } from "@/components/ui/ProfileMark";
import { Reveal } from "@/components/ui/Reveal";
import { RoleRotator } from "@/components/ui/RoleRotator";
import { siteConfig } from "@/data/config";
import { socials, techStack } from "@/data/data";
import { BrandIcon, SocialIcon } from "@/lib/icons";
import { useTheme } from "@/theme/ThemeProvider";
import { withAlpha } from "@/theme/palettes";

const { owner } = siteConfig;
const open = (url?: string | null) =>
  url && Linking.openURL(url).catch(() => {});

const BADGES = [
  "Immediate Joiner",
  "Hybrid",
  "Work From Home",
  "Open to Relocate",
];

/** A single brand-tinted skill chip used by the marquees. */
function TechChip({ tech }: { tech: (typeof techStack)[number] }) {
  const { colors } = useTheme();
  const tint = tech.color ?? colors.primary;
  return (
    <Glass className="flex-row items-center gap-2.5 rounded-full py-2 pl-2 pr-5">
      <View
        style={{ backgroundColor: withAlpha(tint, 0.16) }}
        className="size-9 items-center justify-center rounded-full"
      >
        <BrandIcon
          slug={tech.slug}
          size={20}
          color={tech.color ?? colors.text}
        />
      </View>
      <Text className="text-sm font-semibold text-content">{tech.name}</Text>
    </Glass>
  );
}

/** A crisp platform icon chip floating around the avatar. */
function PlatformChip({ Icon, size = 48 }: { Icon: LucideIcon; size?: number }) {
  const { colors } = useTheme();
  return (
    <Glass
      variant="glass"
      style={{ width: size, height: size }}
      className="items-center justify-center rounded-2xl"
    >
      <Icon size={size * 0.46} color={colors.primary} />
    </Glass>
  );
}

export function Hero() {
  const { colors } = useTheme();
  const spin = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(360, { duration: 14000, easing: Easing.linear }),
      -1,
    );
  }, [spin]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }],
  }));

  const handleResume = () => {
    open(owner.resumeUrl);
  };

  return (
    <View className="w-full px-5 pt-16 pb-8">
      <View className="mx-auto w-full max-w-3xl gap-12">
        {/* Avatar orb */}
        <Reveal>
          <View
            style={{ width: 240, height: 240, alignSelf: "center" }}
            className="relative"
          >
            {/* rotating outer ring */}
            <Animated.View
              style={[
                {
                  position: "absolute",
                  inset: 0,
                  borderRadius: 120,
                  borderWidth: 2,
                  borderColor: withAlpha(colors.primary, 0.4),
                  borderStyle: "dashed",
                },
                ringStyle,
              ]}
            />
            {/* inner ring */}
            <View
              style={{
                position: "absolute",
                inset: 20,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: withAlpha(colors.secondary, 0.4),
              }}
            />

            {/* profile */}
            <Floating
              amplitude={9}
              style={{
                position: "absolute",
                top: 28,
                left: 28,
                right: 28,
                bottom: 28,
              }}
            >
              <Glass className="h-full w-full items-center justify-center rounded-full">
                <ProfileMark className="h-full w-full" fontSize={72} />
              </Glass>
            </Floating>

            {/* device mocks */}
            {/* platform icons */}
            <Floating
              amplitude={10}
              style={{ position: "absolute", top: -12, right: -14 }}
            >
              <PlatformChip Icon={Monitor} size={50} />
            </Floating>
            <Floating
              amplitude={10}
              delay={700}
              style={{ position: "absolute", top: "44%", right: -22 }}
            >
              <PlatformChip Icon={Smartphone} size={42} />
            </Floating>
            <Floating
              amplitude={10}
              delay={1400}
              style={{ position: "absolute", bottom: -12, left: -14 }}
            >
              <PlatformChip Icon={Globe} size={50} />
            </Floating>

            {/* stat chips */}
            <Floating
              amplitude={9}
              style={{ position: "absolute", top: 20, left: -14 }}
            >
              <Glass
                variant="glass"
                className="flex-row items-center gap-2 rounded-xl px-3 py-2"
              >
                <Sparkles size={14} color={colors.primary} />
                <Text numberOfLines={1} className="text-sm font-medium text-content">
                  3+ yrs
                </Text>
              </Glass>
            </Floating>
            <Floating
              amplitude={11}
              delay={500}
              style={{ position: "absolute", bottom: -8, left: "32%" }}
            >
              <Glass variant="glass" className="rounded-xl px-3 py-2">
                <Text numberOfLines={1} className="text-sm font-medium text-content">
                  25+ projects
                </Text>
              </Glass>
            </Floating>
          </View>
        </Reveal>

        {/* Copy */}
        <View className="gap-1">
          <Reveal>
            <View className="flex-row flex-wrap items-center gap-2">
              <Badge dot>
                {owner.available ? "Available for work" : "Currently building"}
              </Badge>
              {BADGES.map((b) => (
                <Badge key={b}>{b}</Badge>
              ))}
            </View>
          </Reveal>

          <Reveal delay={80}>
            <View className="mt-5 flex-row flex-wrap items-center">
              <Text
                className="text-4xl font-bold tracking-tight text-content"
                style={{ lineHeight: 44 }}
              >
                Hi, I&apos;m{" "}
              </Text>
              <GradientText
                style={{ fontSize: 36, fontWeight: "800", lineHeight: 44 }}
              >
                {owner.name}
              </GradientText>
              <Text
                className="text-4xl font-bold tracking-tight text-content"
                style={{ lineHeight: 44 }}
              >
                .
              </Text>
            </View>
          </Reveal>

          <Reveal delay={160}>
            <View className="mt-2 flex-row flex-wrap items-center gap-x-2">
              <Text className="text-xl font-semibold text-muted">
                I&apos;m a
              </Text>
              <RoleRotator roles={siteConfig.roles} fontSize={22} />
            </View>
          </Reveal>

          <Reveal delay={240}>
            <Text className="mt-6 text-lg text-muted">{owner.tagline}</Text>
          </Reveal>

          <Reveal delay={320}>
            <View className="mt-6 flex-row items-center gap-2">
              <MapPin size={16} color={colors.primary} />
              <Text className="text-sm text-muted">{owner.location}</Text>
            </View>
          </Reveal>

          <Reveal delay={400}>
            <View className="mt-8 flex-row flex-wrap items-center gap-3">
              {socials.map((s) => (
                <Button
                  key={s.name}
                  variant="outline"
                  size="sm"
                  className="size-12 rounded-xl px-0 py-0"
                  onPress={() => open(s.href)}
                >
                  <SocialIcon
                    kind={s.kind}
                    size={20}
                    color={colors["text-muted"]}
                  />
                </Button>
              ))}
              <Button size="lg" icon={Download} onPress={handleResume}>
                Resume
              </Button>
            </View>
          </Reveal>
        </View>

        {/* Tech marquees */}
        <Reveal delay={500}>
          <View className="gap-3">
            <Marquee
              items={techStack}
              renderItem={(t) => <TechChip tech={t} />}
            />
            <Marquee
              items={[...techStack].reverse()}
              renderItem={(t) => <TechChip tech={t} />}
              reverse
            />
          </View>
        </Reveal>
      </View>
    </View>
  );
}
