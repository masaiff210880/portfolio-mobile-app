import { useState } from "react";
import { Modal, Pressable, ScrollView, Share, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Check,
  Layers,
  Moon,
  Palette,
  Share2,
  Sun,
  X,
} from "lucide-react-native";

import { Glass } from "@/components/ui/Glass";
import { ProfileMark } from "@/components/ui/ProfileMark";
import { siteConfig } from "@/data/config";
import { cn } from "@/lib/cn";
import { GLASS_STYLES, THEMES } from "@/theme/palettes";
import { useTheme } from "@/theme/ThemeProvider";

/** Floating top-right controls: share + appearance (theme) switcher. */
export function TopControls() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const { theme, glass, isDark, colors, setTheme, setGlass, toggle } =
    useTheme();

  const onShare = async () => {
    try {
      await Share.share({
        title: `${siteConfig.owner.name} — ${siteConfig.roleShort}`,
        message: `Check out ${siteConfig.owner.name}'s portfolio: ${siteConfig.appUrl}`,
        url: siteConfig.appUrl,
      });
    } catch {
      /* user dismissed */
    }
  };

  return (
    <>
      {/* Brand — top-left */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 10,
          left: 16,
          zIndex: 60,
        }}
        className="flex-row items-center gap-2.5"
      >
        <ProfileMark
          className="size-10 border border-border"
          fontSize={14}
        />
        <View>
          <Text numberOfLines={1} className="text-sm font-bold text-content">
            {siteConfig.owner.name}
          </Text>
          <Text numberOfLines={1} className="text-xs font-medium text-muted">
            {siteConfig.roleShort}
          </Text>
        </View>
      </View>

      {/* Floating cluster */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 10,
          right: 16,
          zIndex: 60,
        }}
        className="flex-row items-center gap-2"
      >
        <Pressable onPress={toggle}>
          <Glass
            variant="glass"
            className="size-11 items-center justify-center rounded-full"
          >
            {isDark ? (
              <Sun size={20} color={colors.text} />
            ) : (
              <Moon size={20} color={colors.text} />
            )}
          </Glass>
        </Pressable>
        <Pressable onPress={onShare}>
          <Glass
            variant="glass"
            className="size-11 items-center justify-center rounded-full"
          >
            <Share2 size={20} color={colors.text} />
          </Glass>
        </Pressable>
        <Pressable
          onPress={() => setOpen(true)}
          style={{
            shadowColor: colors.primary,
            shadowOpacity: 0.45,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 6 },
            elevation: 8,
          }}
          className="size-11 items-center justify-center rounded-full bg-primary"
        >
          <Palette size={20} color={colors["primary-fg"]} />
        </Pressable>
      </View>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          onPress={() => setOpen(false)}
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <Animated.View entering={FadeInUp.duration(250)}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <Glass
                variant="glass"
                className="rounded-t-3xl p-5"
                style={{ backgroundColor: colors.surface }}
              >
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-base font-semibold text-content">
                    Appearance
                  </Text>
                  <Pressable onPress={() => setOpen(false)} className="p-1">
                    <X size={18} color={colors["text-muted"]} />
                  </Pressable>
                </View>

                <ScrollView
                  style={{ maxHeight: 460 }}
                  showsVerticalScrollIndicator={false}
                >
                  {/* Mode toggle */}
                  <Pressable
                    onPress={toggle}
                    className="mb-4 flex-row items-center justify-between rounded-xl border border-border bg-surface-2 px-4 py-3"
                  >
                    <View className="flex-row items-center gap-2">
                      {isDark ? (
                        <Moon size={16} color={colors.text} />
                      ) : (
                        <Sun size={16} color={colors.text} />
                      )}
                      <Text className="text-sm font-medium text-content">
                        {isDark ? "Dark" : "Light"} mode
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: isDark
                          ? colors.primary
                          : colors.border,
                      }}
                      className="h-6 w-11 justify-center rounded-full px-0.5"
                    >
                      <View
                        style={{
                          alignSelf: isDark ? "flex-end" : "flex-start",
                        }}
                        className="size-5 rounded-full bg-white"
                      />
                    </View>
                  </Pressable>

                  {/* Themes */}
                  <Text className="mb-2 text-xs font-medium uppercase text-muted">
                    Color theme
                  </Text>
                  <View className="gap-2">
                    {THEMES.map((t) => {
                      const activeT = theme === t.key;
                      return (
                        <Pressable
                          key={t.key}
                          onPress={() => {
                            setTheme(t.key);
                            setOpen(false);
                          }}
                          style={{
                            borderColor: activeT
                              ? colors.primary
                              : colors.border,
                          }}
                          className={cn(
                            "flex-row items-center justify-between rounded-xl border px-3 py-2.5",
                            activeT && "bg-surface-2",
                          )}
                        >
                          <View className="flex-row items-center gap-3">
                            <View className="flex-row">
                              {t.swatch.map((c, i) => (
                                <View
                                  key={i}
                                  style={{
                                    backgroundColor: c,
                                    marginLeft: i === 0 ? 0 : -6,
                                  }}
                                  className="size-4 rounded-full border-2 border-surface"
                                />
                              ))}
                            </View>
                            <View>
                              <Text className="text-sm font-medium text-content">
                                {t.name}
                              </Text>
                              <Text className="text-xs text-muted">
                                {t.description}
                              </Text>
                            </View>
                          </View>
                          {activeT ? (
                            <Check size={16} color={colors.primary} />
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </View>

                  {/* Glass */}
                  <Text className="mb-2 mt-4 text-xs font-medium uppercase text-muted">
                    Glass style
                  </Text>
                  <View className="gap-2 pb-2">
                    {GLASS_STYLES.map((g) => {
                      const activeG = glass === g.key;
                      return (
                        <Pressable
                          key={g.key}
                          onPress={() => setGlass(g.key)}
                          style={{
                            borderColor: activeG
                              ? colors.primary
                              : colors.border,
                          }}
                          className={cn(
                            "flex-row items-center justify-between rounded-xl border px-3 py-2.5",
                            activeG && "bg-surface-2",
                          )}
                        >
                          <View className="flex-row items-center gap-3">
                            <View className="size-8 items-center justify-center rounded-lg bg-surface-2">
                              <Layers size={16} color={colors.primary} />
                            </View>
                            <View>
                              <Text className="text-sm font-medium text-content">
                                {g.name}
                              </Text>
                              <Text className="text-xs text-muted">
                                {g.description}
                              </Text>
                            </View>
                          </View>
                          {activeG ? (
                            <Check size={16} color={colors.primary} />
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </View>
                </ScrollView>
              </Glass>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}
