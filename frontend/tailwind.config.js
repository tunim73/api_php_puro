/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      md: "768px",
      lg: "	1024px"
    },
    fontSize: {
      sm: '1.1rem',
      base: '1.5rem',
      xl: '1.953rem',
      '2xl': '2.441rem',
      '3xl': '3.052rem',
      '4xl': '3.652rem',
      '5xl': '4.052rem',
    }
  },
  plugins: [require("flowbite/plugin")],
};
