/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navbar: "var(--navbar-bg)",
        "accent-green": "var(--accent-green)",
        "accent-red": "var(--accent-red)",
        "accent-gold": "var(--accent-gold)",
      },
    },
  },
  plugins: [],
};
