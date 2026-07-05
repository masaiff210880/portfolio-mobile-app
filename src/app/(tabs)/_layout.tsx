import { useState } from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";

import { Preloader } from "@/components/layout/Preloader";
import { TabBar } from "@/components/layout/TabBar";
import { TopControls } from "@/components/layout/TopControls";
import { useTheme } from "@/theme/ThemeProvider";

export default function TabsLayout() {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: "transparent" },
          animation: "shift",
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="about" options={{ title: "About" }} />
        <Tabs.Screen name="skills" options={{ title: "Skills" }} />
        <Tabs.Screen name="projects" options={{ title: "Projects" }} />
        <Tabs.Screen name="experience" options={{ title: "Experience" }} />
        <Tabs.Screen name="contact" options={{ title: "Contact" }} />
      </Tabs>

      <TopControls />

      {loading ? <Preloader onDone={() => setLoading(false)} /> : null}
    </View>
  );
}
