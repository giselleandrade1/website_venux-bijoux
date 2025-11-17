import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '../../design-system/themes'
import '../../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
