import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
      ,colors:{
        primary:'#3D566D',
        secondary:'#7E99B46D',
        third:'#ADC9E56D',
      },backgroundColor:{
        primary:'#3D566D',
        secondary:'#7E99B46D',
        third:'#7E99B46D',


      }
    },
  },
  plugins: [],
}
export default config
