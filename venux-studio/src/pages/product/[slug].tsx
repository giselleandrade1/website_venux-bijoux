import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MainLayout from '../../layouts/MainLayout'
import ProductDetail from '../../components/ProductDetail'
import { getProduct } from '../../services/api'
import { useCartContext } from '../../contexts/CartContext'

const ProductPage: React.FC = () => {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState<any>(null)
  const { add } = useCartContext()

  useEffect(() => {
    if (!slug) return
    getProduct(String(slug)).then(res => setProduct(res.data)).catch(() => {})
  }, [slug])

  if (!product) return (
    <MainLayout>
      <div style={{ padding: 24 }}>Carregando...</div>
    </MainLayout>
  )

  return (
    <MainLayout>
      <div style={{ padding: 24 }}>
        <ProductDetail
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          images={product.images}
          hasPendant={product.hasPendant}
          pendantOptions={product.pendantOptions}
          onAddToCart={({ productId, pendantId, qty }) => add({ id: productId, title: product.title, price: product.price, quantity: qty || 1, pendantId })}
        />
      </div>
    </MainLayout>
  )
}

export default ProductPage
