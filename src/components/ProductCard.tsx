import React from 'react'
import styled from 'styled-components'

const Card = styled.article`
  background: ${p => p.theme.colors.surface};
  border-radius: ${p => p.theme.radius.md};
  box-shadow: ${p => p.theme.elevation.low};
  padding: ${p => p.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
` as any

const ImageBox = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-radius: ${p => p.theme.radius.sm};
  overflow: hidden;
  background: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01));
` as any

const Title = styled.h3`
  font-family: ${p => p.theme.typography.fontFamilyPrimary};
  font-size: ${p => p.theme.typography.fontSizeMd};
  margin: 0;
` as any

const Price = styled.div`
  font-weight: 700;
  color: ${p => p.theme.colors.primary};
` as any

export interface ProductCardProps {
  id: string
  name: string
  price: number
  image?: string
  onAdd?: (id: string) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, onAdd }) => {
  return (
    <Card>
      <ImageBox aria-hidden={image ? 'false' : 'true'}>
        {/* image would be absolutely positioned here */}
      </ImageBox>
      <Title>{name}</Title>
      <Price>R$ {price.toFixed(2)}</Price>
      <button aria-label={`Adicionar ${name} ao carrinho`} onClick={() => onAdd && onAdd(id)}>Adicionar</button>
    </Card>
  )
}

export default ProductCard
