import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors:{
      pinky: '#FDCEDF',
      greeny: '#DADDB1',
      brownish: '#C1A3A3',
      brown:'#886F6F',
      cardpink: '#F8E8EE'
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
