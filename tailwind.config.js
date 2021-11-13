module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pri: "#2F798C",
        slightBlue: "#F5FDFF",
        dotsDefault: "rgba(0, 0, 0, 0.3)",
        activeDot: "rgba(255, 255, 255, 0.5)",
        arrowhover: "rgba(0, 0, 0, 0.6)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
