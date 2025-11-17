import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useCartContext } from "../contexts/CartContext";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
` as any;

const Gallery = styled.div`
  background: var(--color-surface);
  border-radius: var(--radius-md);
  min-height: 420px;
` as any;

const Info = styled.div`
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  color: var(--color-text);
` as any;

export interface PendantOption {
  id: string;
  color: "dourado" | "prata" | "bronze";
  priceAdjustment?: number;
}

export interface ProductDetailProps {
  id: string;
  title: string;
  price: number;
  description?: string;
  images?: string[];
  hasPendant?: boolean;
  pendantOptions?: PendantOption[];
  onAddToCart?: (payload: {
    productId: string;
    pendantId?: string;
    qty?: number;
  }) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  id,
  title,
  price,
  description,
  images = [],
  hasPendant,
  pendantOptions = [],
  onAddToCart,
}: ProductDetailProps) => {
  const { add } = useCartContext();
  const [selectedPendant, setSelectedPendant] = useState<string | undefined>(
    pendantOptions[0]?.id
  );
  const [qty, setQty] = useState<number>(1);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({ productId: id, pendantId: selectedPendant, qty });
    } else {
      add({ id, title, price, quantity: qty, pendantId: selectedPendant });
    }
  };

  const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  ` as any;

  const PendantRow = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
  ` as any;

  const QuantityRow = styled.div`
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  ` as any;

  const ActionsRow = styled.div`
    margin-top: 16px;
  ` as any;

  const PriceBox = styled.div`
    font-weight: 700;
    margin-top: 6px;
  ` as any;

  return (
    <Wrapper>
      <Gallery>
        {/* simplified gallery: show first image */}
        <Img src={images[0] || "/logo.svg"} alt={title} />
      </Gallery>
      <Info>
        <h1>{title}</h1>
        <PriceBox>R$ {price.toFixed(2)}</PriceBox>
        <p>{description}</p>
        {hasPendant && pendantOptions.length > 0 && (
          <div>
            <h4>Escolha o pingente</h4>
            <PendantRow>
              {pendantOptions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPendant(p.id)}
                  aria-pressed={selectedPendant === p.id ? "true" : "false"}
                >
                  {p.color}
                </button>
              ))}
            </PendantRow>
          </div>
        )}
        <QuantityRow>
          <label htmlFor={`qty-${id}`}>Quantidade</label>
          <input
            id={`qty-${id}`}
            aria-label="Quantidade"
            type="number"
            value={qty}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQty(Number(e.target.value) || 1)
            }
            min={1}
          />
        </QuantityRow>
        <ActionsRow>
          <Button onClick={handleAdd}>Adicionar ao carrinho</Button>
        </ActionsRow>
      </Info>
    </Wrapper>
  );
};

export default ProductDetail;
