import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "../src/context/ThemeProvider";
import SearchProvider from "../src/context/SearchProvider";
import CartProvider from "../src/context/CartProvider";
import CartDrawer from "../src/components/CartDrawer";

export const metadata: Metadata = {
  title: "Venux Bijoux - Loja de Bijuterias",
  description: "Venux Bijoux - bijuterias artesanais e únicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          <SearchProvider>
            <CartProvider>
              <header className="site-header">
                <div className="container header-inner">
                  <div className="logo">Venux Bijoux</div>
                  <nav>
                    <ul className="menu">
                      <li>
                        <a href="#produtos">Produtos</a>
                      </li>
                      <li>
                        <a href="#sobre">Sobre</a>
                      </li>
                      <li>
                        <a href="#contato">Contato</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </header>

              <main>{children}</main>

              <footer className="site-footer">
                <div className="container">
                  <p>© 2025 Venux Bijoux - Todos os direitos reservados.</p>
                </div>
              </footer>
              <CartDrawer />
            </CartProvider>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
