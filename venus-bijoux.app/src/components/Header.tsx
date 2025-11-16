"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../design-system/design-tokens.css";
import "../../design-system/components/styles.css";
import { useTheme } from "../context/ThemeProvider";
import { useSearch } from "../context/SearchProvider";

type HeaderProps = {
  logo?: string;
  logoAlt?: string;
  cartCount?: number;
  onSearch?: (q: string) => void;
};

export default function Header({
  logo = "/imagens/logo.svg",
  logoAlt = "Venux Bijoux",
  cartCount = 0,
  onSearch,
}: HeaderProps) {
  const { theme, toggle } = useTheme();
  const { setQ } = useSearch();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const themeBtnRef = useRef<HTMLButtonElement | null>(null);

  const open = Boolean(query && query.length > 0);

  const suggestions = query
    ? ["colar", "brinco", "pingente"].filter((s) =>
        s.includes(query.toLowerCase())
      )
    : [];

  // update ARIA attributes on the real DOM to keep JSX attributes literal for static analysis
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute("aria-expanded", open ? "true" : "false");
    }
    if (listRef.current) {
      listRef.current.setAttribute("aria-hidden", open ? "false" : "true");
    }
  }, [open]);

  // reflect aria-pressed on the button
  useEffect(() => {
    if (themeBtnRef.current) {
      themeBtnRef.current.setAttribute(
        "aria-pressed",
        theme === "dark" ? "true" : "false"
      );
    }
  }, [theme]);

  return (
    <header className="header" role="banner">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label={logoAlt}>
          <Image
            src={logo}
            alt={logoAlt}
            width={120}
            height={36}
            className="logo-img"
          />
        </Link>

        <div className="search" role="search" aria-label="Busca de produtos">
          <label htmlFor="header-search" className="visually-hidden">
            Buscar produtos
          </label>
          <input
            id="header-search"
            ref={inputRef}
            type="search"
            placeholder="Buscar colares, brincos, pingentes..."
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setQuery(v);
              setQ(v);
              onSearch?.(v);
            }}
            className="search-input"
          />

          <ul
            id="search-suggestions"
            role="listbox"
            aria-label="Sugestões de busca"
            ref={listRef}
            className={`search-suggestions ${open ? "open" : ""}`}
          >
            {suggestions.length
              ? suggestions.map((s) => (
                  <li
                    key={s}
                    role="option"
                    aria-selected="false"
                    className="search-suggestion"
                  >
                    {s} — sugestão
                  </li>
                ))
              : null}
          </ul>
        </div>

        <nav className="controls" aria-label="Controles da conta e carrinho">
          <button
            ref={themeBtnRef}
            className="btn"
            id="theme-toggle"
            aria-pressed="false"
            aria-label="Alternar modo claro/escuro"
            onClick={() => toggle()}
          >
            {theme === "dark" ? (
              // sun icon for light (we show sun when currently dark to indicate toggling)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // moon icon for dark (we show moon when currently light to indicate toggling)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button className="btn" aria-label="Minha conta" id="btn-profile">
            👤
          </button>

          <button className="btn" aria-label="Carrinho" id="btn-cart">
            🛒 <span aria-hidden="true">(</span>
            <span id="cart-count" aria-live="polite">
              {cartCount}
            </span>
            <span aria-hidden="true">)</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
