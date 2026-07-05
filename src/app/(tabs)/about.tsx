import { Screen } from "@/components/layout/Screen";
import { About } from "@/components/sections/About";

export default function AboutTab() {
  return (
    <Screen extraTop={40}>
      <About />
    </Screen>
  );
}
