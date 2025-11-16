"use client";

import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("venux-theme");
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
        document.documentElement.setAttribute("data-theme", stored);
        return;
      }
    } catch {}

    // fallback to current attribute or default
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("venux-theme", next);
    } catch {}
  }

  // Render literal aria-pressed values by branching so value is a string literal
  if (theme === "dark") {
    return (
      <button
        className="theme-toggle-button"
        onClick={toggle}
        aria-pressed="true"
        aria-label="Alternar tema"
        title="Alternar tema"
      >
        <span className="ttb-inner">
          <svg
            className="icon icon-moon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              fill="currentColor"
            />
          </svg>

          <svg
            className="icon icon-cloud"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M20 17.58A4.5 4.5 0 0016.5 13c-.3 0-.6.03-.88.1A6 6 0 106 17.5"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
    );
  }

  return (
    <button
      className="theme-toggle-button"
      onClick={toggle}
      aria-pressed="false"
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      <span className="ttb-inner">
        <svg
          className="icon icon-sun"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3.25" fill="currentColor" />
          <g
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4v1.5" />
            <path d="M12 18.5V20" />
            <path d="M4 12h1.5" />
            <path d="M18.5 12H20" />
            <path d="M5.6 5.6l1.05 1.05" />
            <path d="M17.35 17.35l1.05 1.05" />
            <path d="M17.35 6.65l1.05-1.05" />
            <path d="M5.6 18.4l1.05-1.05" />
          </g>
        </svg>

        <svg
          className="icon icon-cloud"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M20 17.58A4.5 4.5 0 0016.5 13c-.3 0-.6.03-.88.1A6 6 0 106 17.5"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  );
}
