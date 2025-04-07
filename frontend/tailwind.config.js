/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('../src/assets/job.jpg')",
        "header": "url('../src/assets/haeder.jpg')",
        "sign": "url('../src/assets/sign.jpg')",
      },
    },
  },
  plugins: [],
};
