import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../design-system/themes";
import "../../styles/global.css";
import { AuthProvider, CartProvider } from "../contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
