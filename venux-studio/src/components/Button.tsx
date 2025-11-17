import React from "react";
import styled from "styled-components";
import Icon from "./icons";

const Btn = styled.button`
  background: var(--color-primary);
  color: var(--color-text-light, #fff);
  border: none;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
` as any;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  icon?: "cart" | "search" | "close" | "eye";
  iconSize?: number;
  iconOnly?: boolean;
};

const IconOnly = styled(Btn)`
  padding: 8px;
  width: 40px;
  height: 40px;
  justify-content: center;
  border-radius: 999px;
` as any;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  icon,
  iconSize = 16,
  iconOnly = false,
  ...rest
}) => {
  const Component = iconOnly ? IconOnly : Btn;
  // when iconOnly is used, ensure accessible label exists via aria-label
  if (iconOnly && !rest["aria-label"]) {
    console.warn(
      "Icon-only buttons should include an aria-label for accessibility"
    );
  }
  return (
    <Component {...rest} data-variant={variant}>
      {icon && <Icon name={icon} size={iconSize} />}
      {!iconOnly && children}
    </Component>
  );
};

export default Button;
