import React from 'react'
import MainLayout from '../layouts/MainLayout'

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <section style={{ padding: 32 }}>
        <h1>Venux Bijoux</h1>
        <p>Loja de bijuterias artesanais — guia de estilo Coffee Palette</p>
      </section>
    </MainLayout>
  )
}

export default HomePage
