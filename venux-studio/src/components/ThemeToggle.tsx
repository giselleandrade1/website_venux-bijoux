import React from "react";
import styled, { keyframes } from "styled-components";
import { useAppTheme } from "../contexts/ThemeContext";
import Icon from "./icons";

const rotate = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(20deg) }
`;

const ToggleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 8px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary || "currentColor"};
  cursor: pointer;
  transition: box-shadow 160ms ease, transform 160ms ease, background 220ms ease,
    color 220ms ease;
  box-shadow: ${({ theme }) => theme.elevation.elevationLow};

  &:hover {
    transform: translateY(-2px);
  }

  .icon-wrap {
    position: relative;
    width: 20px;
    height: 20px;
    display: inline-block;
  }

  .icon-front,
  .icon-back {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 420ms cubic-bezier(0.2, 0.9, 0.2, 1),
      transform 420ms cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .icon-front {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  .icon-back {
    opacity: 0;
    transform: translateY(-6px) scale(0.9);
  }

  &.dark {
    background: ${({ theme }) => theme.colors.mochaDark || "#3E2C28"};
    color: #fff;
    .icon-front {
      opacity: 0;
      transform: translateY(6px) scale(0.9);
    }
    .icon-back {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  &:active {
    animation: ${rotate} 240ms linear;
  }
` as any;

const SrOnly = styled.span`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
` as any;

const ThemeToggle: React.FC = () => {
  const { theme, toggle, isDark } = useAppTheme();

  const onToggle = () => {
    toggle();
  };

  return (
    <ToggleBtn
      aria-pressed={isDark}
      aria-label={
        isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
      }
      onClick={onToggle}
      className={isDark ? "dark" : "light"}
    >
      <div className="icon-wrap" aria-hidden>
        <div className="icon-front">
          <Icon name="sun" size={18} />
        </div>
        <div className="icon-back">
          <Icon name="cloudmoon" size={18} />
        </div>
      </div>
      <SrOnly>{isDark ? "Modo escuro" : "Modo claro"}</SrOnly>
    </ToggleBtn>
  );
};

export default ThemeToggle;
