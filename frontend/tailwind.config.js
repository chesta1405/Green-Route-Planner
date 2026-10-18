/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F8F5',
          100: '#E1EFE8',
          200: '#C3DFD2',
          300: '#9BC7B4',
          400: '#52B788',
          500: '#40916C',
          600: '#2D6A4F',
          700: '#1B4332',
          800: '#143326',
          900: '#081C15',
        },
        sage: {
          50: '#F7FAF7',
          100: '#EAF3EB',
          200: '#D8EAD9',
          300: '#BFDCBF',
          400: '#9FC99F',
          500: '#7FAF7F',
        },
        eco: {
          emerald: '#10B981',
          teal: '#0D9488',
          leaf: '#22C55E',
          lime: '#84CC16',
          sky: '#0EA5E9',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 67, 50, 0.08)',
        'card': '0 2px 12px -1px rgba(27, 67, 50, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
