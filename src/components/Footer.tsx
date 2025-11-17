import React from 'react'
import styled from 'styled-components'

const FooterWrap = styled.footer`
  padding: 24px 16px;
  background: ${p => p.theme.colors.surface};
  color: ${p => p.theme.colors.text};
  border-top: 1px solid rgba(0,0,0,0.04);
` as any

export const Footer: React.FC = () => {
  return (
    <FooterWrap>
      <div>© {new Date().getFullYear()} Venux Bijoux. Todos os direitos reservados.</div>
    </FooterWrap>
  )
}

export default Footer
