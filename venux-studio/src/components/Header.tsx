import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: ${p => p.theme.colors.surface};
  color: ${p => p.theme.colors.textPrimary || '#1f1a18'};
  box-shadow: ${p => p.theme.elevation.elevationLow};
` as any

const Logo = styled.a`
  font-family: ${p => p.theme.typography.fontFamilyPrimary};
  font-size: ${p => p.theme.typography.fontSizeLg};
  text-decoration: none;
  color: inherit;
` as any

const Actions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
` as any

export const Header: React.FC = () => {
  return (
    <Wrapper>
      <Logo href="/">Venux</Logo>
      <Actions>
        <input aria-label="Buscar" placeholder="Buscar" />
        <button aria-label="Abrir carrinho">Carrinho</button>
      </Actions>
    </Wrapper>
  )
}

export default Header
