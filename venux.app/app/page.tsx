"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearch } from "../src/context/SearchProvider";
import { useCart } from "../src/context/CartProvider";

type ProductType = "Colar" | "Anel" | "Brinco" | "Pulseira";
type VariantKey = "prata" | "dourado";
type Product = {
  id: number;
  type: ProductType;
  name: string;
  description: string;
};

export default function Home() {
  const imagePool: Record<ProductType, Record<VariantKey, string>> = {
    Colar: {
      prata: "/imagens/colar1_prata.svg",
      dourado: "/imagens/colar1_dourado.svg",
    },
    Anel: {
      prata: "/imagens/anel1_prata.svg",
      dourado: "/imagens/anel1_dourado.svg",
    },
    Brinco: {
      prata: "/imagens/brinco1_prata.svg",
      dourado: "/imagens/brinco1_dourado.svg",
    },
    Pulseira: {
      prata: "/imagens/pulseira1_prata.svg",
      dourado: "/imagens/pulseira1_dourado.svg",
    },
  };

  const types: ProductType[] = ["Colar", "Anel", "Brinco", "Pulseira"];

  const products: (Product & { price: number })[] = Array.from({
    length: 30,
  }).map((_, i) => {
    const type = types[i % types.length];
    const price = 49.9 + (i % 7) * 15;
    return {
      id: i + 1,
      type,
      name: `${type} Artesanal ${i + 1}`,
      description: `Peça ${type.toLowerCase()} feita à mão, design exclusivo.`,
      price,
    };
  });

  const [selected, setSelected] = useState<Record<number, VariantKey>>(() => {
    const map: Record<number, VariantKey> = {};
    products.forEach((p) => (map[p.id] = "prata"));
    return map;
  });

  const [hovered, setHovered] = useState<{
    id: number | null;
    variant: VariantKey | null;
  }>({ id: null, variant: null });

  function getImageFor(p: Product) {
    const variant =
      hovered.id === p.id && hovered.variant
        ? hovered.variant
        : selected[p.id] || "prata";
    const pool = imagePool[p.type];
    return pool && pool[variant] ? pool[variant] : pool.prata;
  }

  const { q } = useSearch();
  const cart = useCart();

  type LocalCartItem = {
    id: number;
    name: string;
    variant: string;
    price: number;
    qty: number;
  };

  return (
    <>
      <section className="banner">
        <div className="container banner-inner">
          <h1>Bem-vindo à Venux Bijoux</h1>
          <p>Bijuterias únicas feitas com amor e criatividade.</p>
          <a href="#produtos" className="btn btn-primary">
            Explore Agora
          </a>
        </div>
      </section>

      <section id="produtos" className="section">
        <div className="container">
          <h2>Nossos Produtos</h2>
          <div className="grid-produtos">
            {products
              .filter((p) => {
                if (!q) return true;
                return (
                  p.name.toLowerCase().includes(q.toLowerCase()) ||
                  p.type.toLowerCase().includes(q.toLowerCase()) ||
                  p.description.toLowerCase().includes(q.toLowerCase())
                );
              })
              .map((p) => {
                const variants: { key: VariantKey; label: string }[] = [
                  { key: "prata", label: "Prata" },
                  { key: "dourado", label: "Dourado" },
                ];

                return (
                  <div className="produto" key={p.id}>
                    <div className="image-wrap">
                      <Image
                        src={getImageFor(p)}
                        alt={p.name}
                        width={280}
                        height={280}
                        style={{ objectFit: "contain" }}
                      />

                      <div className="variant-badges">
                        {variants.map((v) => {
                          const isSelected = selected[p.id] === v.key;
                          const btnClass = `variant-badge variant-${v.key} ${
                            isSelected ? "selected" : ""
                          }`;

                          // render literal aria-pressed values to satisfy static linting
                          if (isSelected) {
                            return (
                              <button
                                key={v.key}
                                className={btnClass}
                                aria-pressed="true"
                                aria-label={v.label}
                                title={v.label}
                                onMouseEnter={() =>
                                  setHovered({ id: p.id, variant: v.key })
                                }
                                onMouseLeave={() =>
                                  setHovered({ id: null, variant: null })
                                }
                                onClick={() =>
                                  setSelected(
                                    (s: Record<number, VariantKey>) => ({
                                      ...s,
                                      [p.id]: v.key,
                                    })
                                  )
                                }
                                onKeyDown={(
                                  e: React.KeyboardEvent<HTMLButtonElement>
                                ) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelected(
                                      (s: Record<number, VariantKey>) => ({
                                        ...s,
                                        [p.id]: v.key,
                                      })
                                    );
                                  }
                                }}
                                type="button"
                              />
                            );
                          }

                          return (
                            <button
                              key={v.key}
                              className={btnClass}
                              aria-pressed="false"
                              aria-label={v.label}
                              title={v.label}
                              onMouseEnter={() =>
                                setHovered({ id: p.id, variant: v.key })
                              }
                              onMouseLeave={() =>
                                setHovered({ id: null, variant: null })
                              }
                              onClick={() =>
                                setSelected(
                                  (s: Record<number, VariantKey>) => ({
                                    ...s,
                                    [p.id]: v.key,
                                  })
                                )
                              }
                              onKeyDown={(
                                e: React.KeyboardEvent<HTMLButtonElement>
                              ) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setSelected(
                                    (s: Record<number, VariantKey>) => ({
                                      ...s,
                                      [p.id]: v.key,
                                    })
                                  );
                                }
                              }}
                              type="button"
                            />
                          );
                        })}
                      </div>
                    </div>

                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <div className="product-actions">
                      <button
                        className="btn btn-outline"
                        onClick={() => {
                          try {
                            cart.add({
                              id: p.id,
                              name: p.name,
                              variant: selected[p.id],
                              price: p.price,
                            });
                            alert("Adicionado ao carrinho");
                          } catch {
                            // fallback: use localStorage directly
                            const raw =
                              localStorage.getItem("venux-cart") || "[]";
                            const arr: LocalCartItem[] = JSON.parse(raw);
                            const existing = arr.find(
                              (it) =>
                                it.id === p.id && it.variant === selected[p.id]
                            );
                            if (existing) {
                              existing.qty += 1;
                            } else {
                              arr.push({
                                id: p.id,
                                name: p.name,
                                variant: selected[p.id],
                                price: p.price,
                                qty: 1,
                              });
                            }
                            localStorage.setItem(
                              "venux-cart",
                              JSON.stringify(arr)
                            );
                            alert("Adicionado ao carrinho (localStorage)");
                          }
                        }}
                      >
                        Comprar
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          alert(
                            "Configurar função — implementar página de configuração se desejar"
                          )
                        }
                      >
                        Configurar
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section id="sobre" className="section light">
        <div className="container">
          <h2>Sobre a Venux Bijoux</h2>
          <p>
            A Venux Bijoux é uma loja de bijuterias artesanais, feitas com
            materiais de alta qualidade e designs exclusivos.
          </p>
          <p>Nosso objetivo é levar beleza e autenticidade ao seu dia a dia!</p>
        </div>
      </section>

      <section id="contato" className="section">
        <div className="container">
          <h2>Fale Conosco</h2>
          <form className="form">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required />

            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="mensagem">Mensagem:</label>
            <textarea id="mensagem" name="mensagem" required />

            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
