import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const Card = styled.article`
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--elevationLow);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 8px;
` as any;

const ImageBox = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.01));
` as any;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
` as any;

const ModalImg = styled.img`
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  display: block;
` as any;

const Title = styled.h3`
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  margin: 0;
  color: var(--color-text);
` as any;

const Price = styled.div`
  font-weight: 700;
  color: var(--color-primary);
` as any;

const Action = styled.button`
  background: var(--color-accent);
  color: var(--color-text-light, #fff);
  border: none;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
` as any;

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  onAdd?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  onAdd,
}: ProductCardProps) => {
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && image) setOpen(true);
  };

  return (
    <>
      <Card>
        <ImageBox
          role="button"
          tabIndex={0}
          aria-label={`Visualizar ${name}`}
          onClick={() => image && setOpen(true)}
          onKeyDown={handleKeyDown}
        >
          {image ? <ThumbnailImg src={image} alt={name} /> : null}
        </ImageBox>
        <Title>{name}</Title>
        <Price>R$ {price.toFixed(2)}</Price>
        <Action
          aria-label={`Adicionar ${name} ao carrinho`}
          onClick={() => onAdd && onAdd(id)}
        >
          Adicionar
        </Action>
      </Card>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={name}>
        {image && <ModalImg src={image} alt={name} />}
      </Modal>
    </>
  );
};

export default ProductCard;
