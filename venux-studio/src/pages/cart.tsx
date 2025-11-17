import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useCartContext } from "../contexts/CartContext";

const CartPage: React.FC = () => {
  const { state, remove, update } = useCartContext();
  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  return (
    <MainLayout>
      <div style={{ padding: 24 }}>
        <h1>Carrinho</h1>
        {state.items.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <div>
            {state.items.map((i) => (
              <div
                key={i.id}
                style={{ display: "flex", gap: 12, alignItems: "center" }}
              >
                <div style={{ flex: 1 }}>{i.title}</div>
                <div>R$ {i.price.toFixed(2)}</div>
                <input
                  type="number"
                  value={i.quantity}
                  onChange={(e) => update(i.id, Number(e.target.value) || 1)}
                  style={{ width: 80 }}
                />
                <button onClick={() => remove(i.id)}>Remover</button>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              Subtotal: R$ {subtotal.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
