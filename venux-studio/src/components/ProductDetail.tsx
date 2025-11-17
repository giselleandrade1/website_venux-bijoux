import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
` as any

const Gallery = styled.div`
  background: ${p => p.theme.colors.surface};
  border-radius: ${p => p.theme.radius.radiusMd || '10px'};
  min-height: 420px;
` as any

const Info = styled.div`
  background: ${p => p.theme.colors.surface};
  border-radius: ${p => p.theme.radius.radiusMd || '10px'};
  padding: 16px;
` as any

export interface PendantOption {
  id: string
  color: 'dourado' | 'prata' | 'bronze'
  priceAdjustment?: number
}

export interface ProductDetailProps {
  id: string
  title: string
  price: number
  description?: string
  images?: string[]
  hasPendant?: boolean
  pendantOptions?: PendantOption[]
  onAddToCart?: (payload: { productId: string; pendantId?: string; qty?: number }) => void
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ id, title, price, description, images = [], hasPendant, pendantOptions = [], onAddToCart }) => {
  const [selectedPendant, setSelectedPendant] = useState<string | undefined>(pendantOptions[0]?.id)
  const [qty, setQty] = useState(1)

  return (
    <Wrapper>
      <Gallery>
        {/* simplified gallery: show first image */}
        <img src={images[0] || '/logo.svg'} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
      </Gallery>
      <Info>
        <h1>{title}</h1>
        <div style={{ fontWeight: 700 }}>R$ {price.toFixed(2)}</div>
        <p>{description}</p>
        {hasPendant && pendantOptions.length > 0 && (
          <div>
            <h4>Escolha o pingente</h4>
            <div style={{ display: 'flex', gap: 8 }}>
              {pendantOptions.map(p => (
                <button key={p.id} onClick={() => setSelectedPendant(p.id)} aria-pressed={selectedPendant === p.id}>{p.color}</button>
              ))}
            </div>
          </div>
        )}
        <div style={{ marginTop: 12 }}>
          <label>Quantidade</label>
          <input type="number" value={qty} onChange={e => setQty(Number(e.target.value) || 1)} min={1} style={{ width: 80, marginLeft: 8 }} />
        </div>
        <div style={{ marginTop: 16 }}>
          <button onClick={() => onAddToCart && onAddToCart({ productId: id, pendantId: selectedPendant, qty })}>Adicionar ao carrinho</button>
        </div>
      </Info>
    </Wrapper>
  )
}

export default ProductDetail
