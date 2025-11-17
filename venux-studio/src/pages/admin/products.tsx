import React, { useEffect, useState } from 'react'
import MainLayout from '../../../layouts/MainLayout'
import { getProducts } from '../../../services/admin'
import Link from 'next/link'

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    getProducts().then((res: any) => setProducts(res.data || res))
  }, [])

  return (
    <MainLayout>
      <div style={{ padding: 24 }}>
        <h1>Painel Admin - Produtos</h1>
        <Link href="/admin/products/new"><button>Novo produto</button></Link>
        <div style={{ marginTop: 16 }}>
          {products.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, borderBottom: '1px solid #eee' }}>
              <div>{p.title}</div>
              <div>
                <Link href={`/admin/products/${p.id}`}><button>Editar</button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default AdminProductsPage
