import React from "react";
import styled from "styled-components";

type BadgeProps = {
  children?: React.ReactNode;
  variant?: "neutral" | "accent" | "primary";
};

const Root = styled.span<{ variant?: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-family: var(--font-family-secondary);
  background: ${(p) =>
    p.variant === "accent"
      ? "var(--color-accent)"
      : p.variant === "primary"
      ? "var(--color-primary)"
      : "var(--color-secondary)"};
  color: var(--color-text-light, #fff);
` as any;

const Badge: React.FC<BadgeProps> = ({ children, variant = "neutral" }) => {
  return <Root variant={variant}>{children}</Root>;
};

export default Badge;
