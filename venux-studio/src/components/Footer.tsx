import React from 'react'
import styled from 'styled-components'

const Wrap = styled.footer`
  padding: 24px;
  background: ${p => p.theme.colors.surface};
  color: ${p => p.theme.colors.textPrimary || '#1f1a18'};
` as any

export const Footer: React.FC = () => {
  return (
    <Wrap>
      <div>© {new Date().getFullYear()} Venux Bijoux</div>
    </Wrap>
  )
}

export default Footer
