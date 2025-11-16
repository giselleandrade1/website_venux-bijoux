"use client";
import React from "react";
import { useCart } from "../context/CartProvider";

export default function CartDrawer() {
  const { items, remove, updateQty, total, clear } = useCart();

  return (
    <aside aria-label="Carrinho" className="cart-drawer">
      <h4>Meu carrinho</h4>
      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {items.map((it) => (
              <li key={`${it.id}-${it.variant}`} className="cart-item">
                <div className="cart-item-meta">
                  <div className="cart-item-name">{it.name}</div>
                  <div className="cart-item-variant">{it.variant}</div>
                  <div className="cart-item-price">
                    R$ {it.price.toFixed(2).replace(".", ",")}
                  </div>
                </div>
                <div className="cart-item-actions">
                  <input
                    aria-label="Quantidade"
                    className="qty-input"
                    type="number"
                    value={it.qty}
                    min={1}
                    onChange={(e) =>
                      updateQty(
                        it.id,
                        it.variant,
                        Math.max(1, Number(e.target.value) || 1)
                      )
                    }
                  />
                  <button
                    className="btn btn-outline"
                    onClick={() => remove(it.id, it.variant)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <div>Total</div>
            <div>R$ {total().toFixed(2).replace(".", ",")}</div>
          </div>

          <div className="cart-actions">
            <button
              className="btn btn-primary"
              onClick={() =>
                alert(
                  "Checkout simulado — implementar integração de pagamento."
                )
              }
            >
              Checkout
            </button>
            <button className="btn btn-outline" onClick={() => clear()}>
              Limpar
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
