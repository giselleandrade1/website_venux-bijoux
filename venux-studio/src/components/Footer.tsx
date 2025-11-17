import React from "react";
import styled from "styled-components";

const Wrap = styled.footer`
  padding: var(--spacing-lg);
  background: var(--color-surface);
  color: var(--color-text);
  text-align: center;
` as any;

export const Footer: React.FC = () => {
  return (
    <Wrap>
      <div>© {new Date().getFullYear()} Venux Bijoux</div>
    </Wrap>
  );
};

export default Footer;
