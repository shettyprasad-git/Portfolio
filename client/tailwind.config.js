/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#070912",
        panel: "rgba(14, 20, 38, 0.76)",
        line: "rgba(255, 255, 255, 0.1)"
      }
    }
  },
  plugins: []
};
