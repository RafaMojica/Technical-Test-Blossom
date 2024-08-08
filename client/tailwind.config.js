/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryHover: "#EEE3FF",
        primaryButton: "#8054C7",
        secondaryButton: "#5A3696",
        primaryGreen: "#63D838",
        secondaryGreen: "#3B8520",
        primaryGrey: "#6B7280",
        secondaryGrey: "#E5E7EB",
        tertiaryGrey: "#F3F4F6",
        primaryBlue: "#2563EB",
      },
    },
  },
  plugins: [],
};
