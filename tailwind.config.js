/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{html,ts,tsx,vue}" ],
  purge: ['./index.html', './src/**/*.{ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

