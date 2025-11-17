import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 16px;
` as any

const Preview = styled.div`
  background: ${p => p.theme.colors.surface};
  border-radius: ${p => p.theme.radius.md};
  height: 480px;
` as any

const Controls = styled.div`
  background: ${p => p.theme.colors.surface};
  padding: 12px;
  border-radius: ${p => p.theme.radius.md};
` as any

export interface ConfiguratorProps {
  initial?: any
  onSave?: (state: any) => void
}

export const Configurator: React.FC<ConfiguratorProps> = ({ initial, onSave }) => {
  return (
    <Wrapper>
      <div>
        <Preview aria-label="Preview do produto montado">Preview area</Preview>
      </div>
      <Controls>
        <div>Passo 1: Escolha o pingente</div>
        <div>Passo 2: Escolha o acabamento</div>
        <button onClick={() => onSave && onSave(initial)}>Salvar combinação</button>
      </Controls>
    </Wrapper>
  )
}

export default Configurator
