"use client";

import React from "react";
import ThemeToggle from "../components/ThemeToggle";
// styles are provided globally in app/globals.css (Next requires global CSS imported in layout)

export default function Paleta() {
  // Theme is handled by the ThemeToggle component (persists in localStorage)

  return (
    <main className="paleta-root">
      <header className="paleta-header">
        <h1>Tons de Café — Paleta</h1>
        <ThemeToggle />
      </header>

      <section className="palette-grid">
        <PaletteBlock varName="--bg-primary" label="Fundo primário" />
        <PaletteBlock varName="--bg-secondary" label="Fundo secundário" />
        <PaletteBlock varName="--surface" label="Superfície" />
        <PaletteBlock varName="--highlight" label="Destaque" />
        <PaletteBlock varName="--accent-gold" label="Dourado" />
        <PaletteBlock varName="--accent-silver" label="Prata" />
        <PaletteBlock varName="--accent-bronze" label="Bronze" />
        <PaletteBlock varName="--text-primary" label="Texto primário" />
        <PaletteBlock varName="--text-secondary" label="Texto secundário" />
        <PaletteBlock varName="--border" label="Borda" />
      </section>

      <section className="examples">
        <h2>Exemplos de uso</h2>
        <div className="example-row">
          <button className="btn-primary">Botão Primário</button>
          <button className="btn-ghost">Botão Ghost</button>
          <div className="card">
            <h3>Cartão Premium</h3>
            <p>Peça em destaque com borda dourada e fundo suave.</p>
            <button className="btn-cta">Comprar</button>
          </div>
        </div>
      </section>
    </main>
  );
}

function PaletteBlock({ varName, label }: { varName: string; label: string }) {
  return (
    <div className="palette-block">
      <div className={`swatch swatch--${varName.replace(/^--/, "")}`} />
      <div className="meta">
        <div className="label">{label}</div>
        <div className="value">{varName}</div>
      </div>
    </div>
  );
}
