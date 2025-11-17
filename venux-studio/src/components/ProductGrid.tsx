import React from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
` as any

export interface ProductSummary {
  id: string
  name: string
  price: number
  image?: string
}

export interface ProductGridProps {
  products: ProductSummary[]
  onAdd?: (id: string) => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAdd }) => {
  return (
    <Grid>
      {products.map(p => (
        <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} onAdd={onAdd} />
      ))}
    </Grid>
  )
}

export default ProductGrid
