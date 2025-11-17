import React from 'react'
import { Header, Footer, ProductCard } from '../../components'

const AdminIndex: React.FC = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: 24 }}>
        <h1>Painel Admin</h1>
        <section>
          <h2>Produtos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <ProductCard id="prod_1" name="Brinco Lua" price={129.9} />
            <ProductCard id="prod_2" name="Colar Jardim" price={189.0} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default AdminIndex
