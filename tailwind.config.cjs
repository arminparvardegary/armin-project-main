/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  // Some environments may not detect all class names (templates, dynamic classes, etc.).
  // Use pattern-based safelist so core color utilities and common variants are always generated.
  safelist: [
    // simple explicit ones as a fallback
    'bg-white',
    'text-white',
  // patterns: bg-*, text-*, hover:bg-*
  { pattern: /^bg-/ },
  { pattern: /^text-/ },
  { pattern: /^hover:bg-/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
