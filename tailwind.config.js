/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        navyLight: '#163B63',
        teal: '#0EA5A8',
        tealHover: '#0B8F92',
        cyanSoft: '#38BDF8',
        pageBg: '#F5F8FA',
        surface: '#FFFFFF',
        textPrimary: '#102033',
        textSecondary: '#64748B',
        borderColor: '#E2E8F0',
        success: '#16A34A',
        danger: '#DC2626',
        warning: '#D97706',
      },
      boxShadow: {
        card: '0 4px 20px rgba(15, 23, 42, 0.06)',
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
