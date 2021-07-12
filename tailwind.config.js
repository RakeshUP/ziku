module.exports = {
  purge: ['./**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        overflow: '#0E1013',
        surface: '#191b1c',
        surfaceLight: '#202124',
        overlay: '#282A2D',
        overlayLight: '#2E3134',
        cyan: '#12D8FA',
      },
      boxShadow: {
        'neo-button': '10px 10px 20px #141517, -10px -10px 20px #3c3f44',
      },
      fontSize: {
        '8.5xl': '7rem',
      },
      spacing: {
        '1.5-full': '140%',
        '2-full': '180%',
      },
      listStyleType: {
        decimalLeadingZero: 'decimal-leading-zero',
      },
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
  plugins: [],
}