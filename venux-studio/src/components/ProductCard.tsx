import React from 'react'
import styled from 'styled-components'

const Card = styled.article`
  background: ${p => p.theme.colors.surface};
  border-radius: ${p => p.theme.radius.radiusMd || p.theme.radiusMd};
  box-shadow: ${p => p.theme.elevation.elevationLow};
  padding: ${p => p.theme.spacing.spacingMd || '16px'};
  display: flex;
  flex-direction: column;
  gap: 8px;
` as any

const ImageBox = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-radius: ${p => p.theme.radius.radiusSm || '6px'};
  overflow: hidden;
  background: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.01));
` as any

const Title = styled.h3`
  font-family: ${p => p.theme.typography.fontFamilyPrimary};
  font-size: ${p => p.theme.typography.fontSizeMd || '16px'};
  margin: 0;
` as any

const Price = styled.div`
  font-weight: 700;
  color: ${p => p.theme.colors.caramel || '#8B5E4A'};
` as any

const Action = styled.button`
  background: ${p => p.theme.colors.caramel || '#C99B4A'};
  color: ${p => p.theme.colors.textLight || '#fff'};
  border: none;
  padding: 8px 12px;
  border-radius: ${p => p.theme.radius.radiusSm || '6px'};
  cursor: pointer;
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
        {/* Placeholder: ideally use next/image or img absolute */}
      </ImageBox>
      <Title>{name}</Title>
      <Price>R$ {price.toFixed(2)}</Price>
      <Action aria-label={`Adicionar ${name} ao carrinho`} onClick={() => onAdd && onAdd(id)}>Adicionar</Action>
    </Card>
  )
}

export default ProductCard
