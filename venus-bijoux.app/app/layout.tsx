import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Venus Bijoux - Loja de Bijuterias",
  description: "Venus Bijoux - bijuterias artesanais e únicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <div className="logo">Venus Bijoux</div>
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
            <p>© 2025 Venus Bijoux - Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
