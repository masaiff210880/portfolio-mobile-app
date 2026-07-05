import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useTheme } from "@/theme/ThemeProvider";

/**
 * Tailwind-only device mockups mirrored from the desktop `DeviceMock`.
 * Screens use the theme gradient so they read as real, on-brand devices.
 */

function Screen({
  children,
  radius = 14,
}: {
  children?: React.ReactNode;
  radius?: number;
}) {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary, colors.accent]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: radius, overflow: "hidden", flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}

export function PhoneMock({ width = 56 }: { width?: number }) {
  return (
    <View
      style={{
        width,
        aspectRatio: 9 / 19,
        borderRadius: 18,
        padding: 3,
        backgroundColor: "#171717",
      }}
    >
      <View style={{ flex: 1, borderRadius: 15, overflow: "hidden" }}>
        <Screen radius={15}>
          <View
            style={{
              position: "absolute",
              top: 5,
              left: "50%",
              marginLeft: -16,
              height: 6,
              width: 32,
              borderRadius: 999,
              backgroundColor: "#171717",
              zIndex: 2,
            }}
          />
          <View
            style={{
              flex: 1,
              paddingHorizontal: 8,
              paddingTop: 20,
              paddingBottom: 8,
              gap: 6,
            }}
          >
            <View
              style={{
                height: 6,
                width: 32,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.85)",
              }}
            />
            <View
              style={{
                height: 5,
                width: 22,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.5)",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
                marginTop: 4,
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: "28%",
                    aspectRatio: 1,
                    borderRadius: 6,
                    backgroundColor: "rgba(255,255,255,0.25)",
                  }}
                />
              ))}
            </View>
          </View>
        </Screen>
      </View>
    </View>
  );
}

export function DesktopMock({ width = 112 }: { width?: number }) {
  return (
    <View style={{ width, alignItems: "center" }}>
      <View
        style={{
          width: "100%",
          borderRadius: 12,
          padding: 4,
          backgroundColor: "#171717",
        }}
      >
        <View
          style={{ aspectRatio: 16 / 9, borderRadius: 8, overflow: "hidden" }}
        >
          <Screen radius={8}>
            <View style={{ flexDirection: "row", gap: 4, padding: 6 }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.75)",
                }}
              />
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.55)",
                }}
              />
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.4)",
                }}
              />
            </View>
            <View style={{ paddingHorizontal: 8, gap: 5 }}>
              <View
                style={{
                  height: 6,
                  width: 40,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
              />
              <View
                style={{
                  height: 6,
                  width: 28,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.4)",
                }}
              />
              <View
                style={{
                  height: 6,
                  width: 34,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.3)",
                }}
              />
            </View>
          </Screen>
        </View>
      </View>
      <View style={{ height: 10, width: 10, backgroundColor: "#262626" }} />
      <View
        style={{
          height: 6,
          width: 40,
          borderRadius: 999,
          backgroundColor: "#404040",
        }}
      />
    </View>
  );
}

export function WebMock({ width = 112 }: { width?: number }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#171717",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          backgroundColor: "#262626",
          paddingHorizontal: 8,
          paddingVertical: 6,
        }}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#f87171",
          }}
        />
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#facc15",
          }}
        />
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#4ade80",
          }}
        />
        <View
          style={{
            marginLeft: 6,
            height: 6,
            flex: 1,
            borderRadius: 999,
            backgroundColor: "#404040",
          }}
        />
      </View>
      <LinearGradient
        colors={[colors.primary, colors.secondary, colors.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 10, gap: 6 }}
      >
        <View
          style={{
            height: 8,
            width: "75%",
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.75)",
          }}
        />
        <View
          style={{
            height: 6,
            width: "50%",
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.45)",
          }}
        />
        <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 20,
                borderRadius: 6,
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  );
}
