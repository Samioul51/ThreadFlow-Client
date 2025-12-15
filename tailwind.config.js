/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
    content:[
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    darkMode:"class",
    theme:{
        extend:{}
    },
    plugins:[
        daisyui,
    ]
};