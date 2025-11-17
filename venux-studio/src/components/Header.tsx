import React from "react";
import styled from "styled-components";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--elevationLow);
` as any;

const Logo = styled.a`
  font-family: var(--font-family-primary);
  font-size: var(--font-size-lg);
  text-decoration: none;
  color: inherit;
` as any;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
` as any;

const SearchInput = styled.input`
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: transparent;
  min-width: 240px;
` as any;

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <Wrapper>
      <Logo href="/">Venux</Logo>
      <Actions>
        <SearchInput aria-label="Buscar produtos" placeholder="Buscar" />
        <ThemeToggle />
        <Button aria-label="Abrir carrinho" icon="cart" iconOnly />
        {isAuthenticated ? (
          <Button
            onClick={() => logout()}
            aria-label="Sair"
            icon="close"
            iconOnly
          />
        ) : (
          <Button onClick={() => (window.location.href = "/auth/login")}>
            Entrar
          </Button>
        )}
      </Actions>
    </Wrapper>
  );
};

export default Header;
