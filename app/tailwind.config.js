module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        head: ["Rubik"],
      },
    },
  },
  plugins: [require("daisyui")],
};
