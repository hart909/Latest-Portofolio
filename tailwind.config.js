/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      heading: ["Space Grotesk", "sans-serif"],
      bricolage: ["Bricolage Grotesque", 'sans-serif'],
      mono: ["JetBrains Mono", "monospace"],
    },
  },
},

  plugins: [],
  
}
