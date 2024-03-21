import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';

const Backdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 30%);
`;

const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 460px;
  height: 260px;

  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);

  color: #000000;
  text-align: center;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.6px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  height: 100%;

  color: #000000;
  text-align: center;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.6px;
`;

const HelperText = styled.span`
  color: #757575;
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.6px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button<{ primary?: boolean }>`
  width: 100%;
  height: 80px;
  cursor: pointer;

  border: none;
  background-color: ${({ primary }) => (primary ? '#FF706C' : '#eeeeee')};

  color: ${({ primary }) => (primary ? '#ffffff' : '#424242')};

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.6px;
`;

interface ConfirmationDialogProps {
  isOpen: boolean;
  text: string;
  helperText?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ConfirmationDialog = ({
  isOpen,
  text,
  helperText,
  confirmText = '확인',
  cancelText = '아니오',
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onCancel?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <Backdrop>
      <DialogContainer ref={containerRef}>
        <TextContainer>
          {text}
          <HelperText>{helperText}</HelperText>
        </TextContainer>
        <ButtonContainer>
          {onConfirm && (
            <Button primary onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
          {onCancel && <Button onClick={onCancel}>{cancelText}</Button>}
        </ButtonContainer>
      </DialogContainer>
    </Backdrop>
  );
};
