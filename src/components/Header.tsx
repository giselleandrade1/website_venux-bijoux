import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.text};
  box-shadow: ${p => p.theme.elevation.low};
` as any

const Logo = styled.a`
  font-family: ${p => p.theme.typography.fontFamilyPrimary};
  font-size: ${p => p.theme.typography.fontSizeLg};
  text-decoration: none;
  color: inherit;
` as any

const RightActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
` as any

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: ${p => p.theme.radius.md};
  border: 1px solid rgba(0,0,0,0.06);
  width: 220px;
` as any

export interface HeaderProps {
  onToggleTheme?: () => void
  cartCount?: number
}

export const Header: React.FC<HeaderProps> = ({ onToggleTheme, cartCount = 0 }) => {
  return (
    <HeaderWrapper>
      <Logo href="/">Venux Bijoux</Logo>
      <SearchInput aria-label="Buscar produtos" placeholder="Buscar peças e pingentes" />
      <RightActions>
        <button aria-label="Alternar tema" onClick={onToggleTheme}>Tema</button>
        <a href="/profile" aria-label="Perfil">Perfil</a>
        <a href="/cart" aria-label="Carrinho">Carrinho ({cartCount})</a>
      </RightActions>
    </HeaderWrapper>
  )
}

export default Header
