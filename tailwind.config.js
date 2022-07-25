module.exports = {
  mode: "jit",
  content: [
    "./pages/index.html",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
  theme: {
    extend: {
      hljs: {
        theme: "atom-one-dark",
      },
    },
  },
  plugins: [require("tailwind-highlightjs")],
};
