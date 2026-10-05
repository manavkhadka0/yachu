// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'counter-spin': 'counter-spin 40s linear infinite',
      },
      keyframes: {
        'counter-spin': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        }
      }
    },
  },
}