/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          primary: "#6B1D2F",
          deep: "#4A1220",
          light: "#8E2323",
          soft: "#F9EBEF",
        },
        gold: {
          primary: "#C59B27",
          antique: "#D4AF37",
          pale: "#FDF5DF",
        },
        saffron: {
          accent: "#E26D39",
          soft: "#FFF1EB",
        },
        cream: {
          bg: "#FAF7F2",
          subtle: "#F5EFE6",
        }
      },
      fontFamily: {
        serif: ["Cinzel", "serif"],
        accent: ["Rozha One", "serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
