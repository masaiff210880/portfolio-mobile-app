import * as simpleIcons from "simple-icons";
import { Globe, Mail } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";

/** A single-path brand icon rendered from simple-icons data. */
export function BrandIcon({
  slug,
  size = 20,
  color,
}: {
  slug: string;
  size?: number;
  color?: string;
}) {
  const icon = (
    simpleIcons as Record<string, { path: string; hex: string } | undefined>
  )[slug];
  if (!icon) return null;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={icon.path} fill={color ?? `#${icon.hex}`} />
    </Svg>
  );
}

/** GitHub glyph (uses simple-icons). */
export function GithubIcon({
  size = 20,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return <BrandIcon slug="siGithub" size={size} color={color} />;
}

/** LinkedIn glyph — simple-icons dropped the named export, so we ship the path. */
export function LinkedinIcon({
  size = 20,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z"
      />
    </Svg>
  );
}

/** WhatsApp glyph (uses simple-icons). */
export function WhatsappIcon({
  size = 20,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return <BrandIcon slug="siWhatsapp" size={size} color={color} />;
}

/** Renders a social glyph from its `kind` discriminator. */
export function SocialIcon({
  kind,
  size = 20,
  color = "currentColor",
}: {
  kind: "github" | "linkedin" | "globe" | "mail";
  size?: number;
  color?: string;
}) {
  if (kind === "github") return <GithubIcon size={size} color={color} />;
  if (kind === "linkedin") return <LinkedinIcon size={size} color={color} />;
  if (kind === "globe") return <Globe size={size} color={color} />;
  return <Mail size={size} color={color} />;
}
