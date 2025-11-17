import React, { useEffect } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
` as any;

const Content = styled.div`
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  width: min(920px, calc(100% - 48px));
  max-height: calc(100vh - 80px);
  overflow: auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.24);
` as any;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
` as any;

const Title = styled.h3`
  margin: 0;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-lg);
` as any;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--color-text);
` as any;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const node = typeof document !== "undefined" ? document.body : null;
  if (!node) return null;

  return createPortal(
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal"}
      onClick={onClose}
    >
      <Content onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <CloseButton aria-label="Fechar" onClick={onClose}>
            ×
          </CloseButton>
        </Header>
        <div>{children}</div>
      </Content>
    </Overlay>,
    node
  );
};

export default Modal;
