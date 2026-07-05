/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        content: "var(--text)",
        muted: "var(--text-muted)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          fg: "var(--primary-fg)",
        },
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
