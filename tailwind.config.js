/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: '#3b82f6',
                dark: '#0f172a',
                'dark-light': '#1e293b',
            }
        },
    },
    plugins: [],
}
