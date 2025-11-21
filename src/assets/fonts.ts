import localFont from 'next/font/local'

export const loveCraftFont = localFont({
  src: [
    {
      path: '../../public/assets/fonts/love-craft.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/love-craft--italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-love-craft',
  preload: false,
})
