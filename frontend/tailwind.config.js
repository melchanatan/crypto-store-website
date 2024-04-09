/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('/hero/bg.jpeg')",
        "footer-image": "url('/footer/bg.jpg')",
      },
      colors: {
        primary: "var(--primary-color)",
        "bg-darken": "var(--background-darken)",
        bg: "var(--background)",
      },
      fontFamily: {
        prompt: ["var(--font-prompt)"],
      },
      animation: {
        "hero-image-1": "hero-image-bounce 5s infinite",
        "hero-image-2": "hero-image-bounce 10s infinite",
      },
      fontSize: {
        "clamp-sm": "clamp(.9rem, 3.5vw, 1.5rem)",
        "clamp-md": "clamp(2rem, 6vw, 3rem)",
        "clamp-lg": "clamp(1.4rem, 4vw, 3rem)",
      },
    },
  },
  plugins: [],
};
