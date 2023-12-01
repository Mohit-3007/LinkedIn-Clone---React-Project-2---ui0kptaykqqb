/** @type {import('tailwindcss').Config} */

const { scrollbarGutter, scrollbarWidth, scrollbarColor } = require('tailwind-scrollbar-utilities');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'res-1176': '1176px',
      'res-1162': '1162px',
      'res-1128': '1128px',
      'res-1000': '1000px',
      'res-1056': '1056px',
      'res-856': '856px',
      'res-768': '768px',
    },
    extend: {},
  },
  plugins: [
    scrollbarGutter(), // no options to configure
    scrollbarWidth(), // no options to configure
    scrollbarColor(), // no options to configure
  ],
}