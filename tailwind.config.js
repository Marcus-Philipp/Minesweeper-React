/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ["./src/**/*.{html,js,jsx}"],
    options: {
      safelist: [
        'text-blue-500', 
        'text-green-500', 
        'text-red-500', 
        'text-teal-500',
        'text-yellow-500', 
        'text-violet-500', 
        'text-gray-500', 
        'text-pink-500',
      ],
    },
  },
  theme: {
    extend: {
      backgroundImage: {
        'mine-pattern': "url('../mine-icon.png')",
        'flag-pattern': "url('../flag-icon.png')"
      }
    },
  },
  plugins: [],
}

