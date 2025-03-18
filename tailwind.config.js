import { preset as Core } from "@sk-web-gui/core";

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  important: ".sk-serviceroot",
  corePlugins: {
    preflight: false,
  },
  blocklist: [],

  presets: [
    Core({
      plugin: { cssBase: false, components: ["AIServiceModule", "Logo"] },
    }),
  ],
};
