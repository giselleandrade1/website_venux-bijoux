import React from "react";
import MainLayout from "../layouts/MainLayout";
import { useCartContext } from "../contexts/CartContext";
import styled from "styled-components";
import api from "../services/api";

const Container = styled.div`
  padding: 24px;
`;

const Total = styled.div`
  margin-top: 16px;
  font-weight: 700;
`;

const ActionButton = styled.button`
  margin-top: 12px;
`;

const CheckoutPage: React.FC = () => {
  const { state, clear } = useCartContext();
  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  const handlePlaceOrder = async () => {
    try {
      const res = await api.post("/orders", {
        items: state.items,
        total: subtotal,
      });
      alert("Pedido criado: " + res.data.orderId);
      clear();
    } catch (err) {
      alert("Erro ao criar pedido");
    }
  };

  return (
    <MainLayout>
      <Container>
        <h1>Finalizar compra</h1>
        {state.items.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <div>
            <ul>
              {state.items.map((i) => (
                <li key={i.id}>
                  {i.title} x {i.quantity} — R${" "}
                  {(i.price * i.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <Total>Total: R$ {subtotal.toFixed(2)}</Total>
            <ActionButton onClick={handlePlaceOrder}>
              Colocar pedido
            </ActionButton>
          </div>
        )}
      </Container>
    </MainLayout>
  );
};

export default CheckoutPage;
