
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-green-500',
    'bg-slate-400',
    'bg-red-500',
    'bg-amber-600',
    'bg-gradient-to-r',
    'from-green-400',
    'to-green-500',
    'from-red-400',
    'to-red-500',
    'from-amber-500',
    'to-amber-600',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
