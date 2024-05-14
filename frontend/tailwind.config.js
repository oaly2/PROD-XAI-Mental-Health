module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white: { A700: "#fcfdff" },
        blue_gray: { 100: "#d9d9d9", 400: "#8b8b8b" },
        gray: { "900_01": "#171c20" },
        black: { 900: "#000000" },
        blue: { 50: "#e2f3ff" },
        red: { A700: "#ff0000" },
        light_blue: { 600: "#00aadf" },
        gray_900: "#191c1e",
      },
      boxShadow: {},
      fontFamily: { inter: "Inter" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
