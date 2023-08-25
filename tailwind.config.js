/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        open_sans: ["Open Sans", "sans-serif"],
      },
      colors: {
        primary: "#043c7c",
        secondary: "#f3b213",
        bgPrimary: "#B9DCC4",
        dark: "#384358",
        tSecondary: "#CED7E2",
        cPrimary: "#FEECF2",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
