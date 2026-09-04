/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                primary: '#050c12',
                secondary: '#10202e',
                accent: '#ff7a18',
                'accent-hover': '#ff9642',
                mint: '#38d9a9',
                sand: '#ffb86c',
                violet: '#9b7fe8',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'float': 'floatDrift 8s ease-in-out infinite',
                'shimmer': 'shimmer 4s linear infinite',
                'spin-slow': 'spin-slow 20s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(24px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                floatDrift: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
            },
            backgroundImage: {
                'brand-gradient': 'linear-gradient(135deg, #ff7a18, #e06010)',
                'mint-gradient': 'linear-gradient(135deg, #38d9a9, #2ec4a0)',
            },
            boxShadow: {
                'glow-brand': '0 0 30px rgba(255, 122, 24, 0.25)',
                'glow-mint': '0 0 30px rgba(56, 217, 169, 0.20)',
                'panel': '0 32px 80px rgba(2, 6, 12, 0.55)',
            },
        },
    },
    plugins: [],
}
