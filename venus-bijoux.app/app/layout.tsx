import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "../src/context/ThemeProvider";
import SearchProvider from "../src/context/SearchProvider";
import CartProvider from "../src/context/CartProvider";
import CartDrawer from "../src/components/CartDrawer";
import ThemeToggle from "./components/ThemeToggle";

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
                  <div className="logo">
                    <a
                      href="https://www.instagram.com/venux.bijoux?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Venux Bijoux
                    </a>
                  </div>
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
                  <div>
                    <ThemeToggle />
                  </div>
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
