import type { GlassKey, Mode, ThemeKey } from "@/theme/palettes";

/**
 * WHITE-LABEL CONFIG — single source of truth for branding.
 * Ported from the desktop app's utils/config.js.
 */
export const siteConfig = {
  brand: "Aarav.dev",
  logoInitials: "RS",
  owner: {
    name: "Ram Surat",
    role: "Frontend Developer",
    tagline:
      "Frontend Developer with 3 years of experience building high-performance web, mobile and desktop applications with clean, delightful interfaces.",
    location: "Mirzapur, Uttar Pradesh, India",
    email: "ram.surat.web@gmail.com",
    phones: [
      { display: "+91 85450 20686", tel: "+918545020686", wa: "918545020686" },
      { display: "+91 97938 14970", tel: "+919793814970", wa: "919793814970" },
    ],
    resumeUrl:
      "https://drive.google.com/file/d/1hr5Y2-LUaD6yUALZBDspRQQ0_NbYYZX1/view",
    resumeDownloadUrl:
      "https://drive.google.com/uc?export=download&id=1hr5Y2-LUaD6yUALZBDspRQQ0_NbYYZX1",
    desktopDownloadUrl:
      "https://github.com/ram-profile/ram.github.io/releases/download/installer-latest/Ram-Setup.exe",
    available: true,
  },
  roles: [
    "Frontend Developer",
    "Frontend Engineer",
    "React.js Developer",
    "Mobile App Developer",
    "Desktop App Developer",
  ],
  roleShort: "Frontend Developer",
  defaultTheme: "aurora" as ThemeKey,
  defaultMode: "dark" as Mode,
  defaultGlass: "frosted" as GlassKey,
  contactRecipient: "ram.surat.web@gmail.com",
  /** URL shared by the in-app share button. */
  appUrl: "https://ram-app.github.io/",
  /**
   * Direct download for the latest Android APK. This "latest release" GitHub
   * URL always resolves to the newest published APK asset of the same name.
   */
  downloadUrl:
    "https://github.com/masaiff210880/portfolio-mobile-app/releases/latest/download/ram-surat-portfolio.apk",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
