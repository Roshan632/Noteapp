module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        alabaster: "#F8F8F8",
        "governor-bay": "#3830A3",
      },
    },
  },
  plugins: [],
};
