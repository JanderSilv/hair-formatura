import { Chicle } from 'next/font/google'
import localFont from 'next/font/local'

export const chicleFont = Chicle({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-chicle',
})

export const partyVibesFont = localFont({
  src: '../../public/assets/fonts/party-vibes.otf',
  variable: '--font-party-vibes',
})
