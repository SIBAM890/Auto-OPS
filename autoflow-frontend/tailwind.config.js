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
            },
            colors: {
                // AutoFlow Brand Colors
                primary: '#10B981', // Emerald 500
                secondary: '#34D399', // Emerald 400
                accent: '#6EE7B7', // Emerald 300
                dark: {
                    900: '#0D0D0D', // Main BG
                    800: '#1A1A1A', // Secondary BG
                    700: '#262626',
                },
                // WhatsApp Specific
                wa: {
                    green: '#075E54',
                    light: '#25D366',
                    chat: '#0B141A',
                    sent: '#005C4B',
                    received: '#202C33',
                }
            },
            animation: {
                'gradient-slow': 'gradientShift 6s ease infinite',
                'float': 'badgeFloat 4s ease-in-out infinite',
                'float-delayed': 'badgeFloat 4s ease-in-out 2s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'phone-float': 'phoneFloat 5s ease-in-out infinite',
                'node-pulse': 'nodeActivate 2s ease-in-out infinite',
                'line-flow': 'flowLine 2s linear infinite',
                'typing': 'typingBounce 1.4s ease-in-out infinite',
            },
            keyframes: {
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                badgeFloat: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                phoneFloat: {
                    '0%, 100%': { transform: 'translateY(0) rotateY(-12deg) rotateX(5deg)' },
                    '50%': { transform: 'translateY(-20px) rotateY(-12deg) rotateX(5deg)' },
                },
                nodeActivate: {
                    '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 rgba(52, 211, 153, 0)' },
                    '50%': { transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(52, 211, 153, 0.5)' },
                },
                flowLine: {
                    'to': { strokeDashoffset: '0' },
                },
                typingBounce: {
                    '0%, 60%, 100%': { transform: 'translateY(0)' },
                    '30%': { transform: 'translateY(-6px)' },
                }
            },
            backgroundImage: {
                'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            }
        },
    },
    plugins: [],
}
