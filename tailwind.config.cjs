/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  // Some environments may not detect all class names (templates, dynamic classes, etc.).
  // Use pattern-based safelist so core color utilities and common variants are always generated.
  safelist: [
    // simple explicit ones as a fallback
    'bg-white',
    'text-white',
    // explicit color utilities used in markup
    'bg-gray-50',
    'bg-pink-500',
    'hover:bg-pink-600',
    'bg-sky-500',
    'text-sky-500',
    'text-blue-500',
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
