import '/styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@material-tailwind/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <Component {...pageProps} />
)
}

export default MyApp
