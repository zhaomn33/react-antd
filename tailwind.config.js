module.exports = {
  content: ['./src/**/*.{js,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B73E8'
      }
    },
    padding: ({ theme }) => theme('spacing')
  },
  corePlugins: { // 防止样式被tailwindcss覆盖
    preflight: false,
  },
  plugins: []
}
