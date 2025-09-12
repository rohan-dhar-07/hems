/** @type {import('tailwindcss').Config} */
module.exports = {
    // This content property is the most important part.
    // It tells Tailwind to scan all of your .jsx and .html files inside the 'src'
    // folder (and the root index.html) for any class names you have used.
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  
  