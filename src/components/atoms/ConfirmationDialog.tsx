import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { Backdrop } from '.';

const DialogContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 460px;
  height: 260px;

  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: normal;
  color: #000;
  text-align: center;
  letter-spacing: -0.6px;

  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(0 0 0 / 25%);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;

  height: 100%;

  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: normal;
  color: #000;
  text-align: center;
  letter-spacing: -0.6px;
`;

const HelperText = styled.span`
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
  color: #757575;
  text-align: center;
  letter-spacing: -0.6px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button<{ primary?: boolean }>`
  cursor: pointer;

  width: 100%;
  height: 80px;

  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: normal;
  color: ${({ primary }) => (primary ? '#ffffff' : '#424242')};
  letter-spacing: -0.6px;

  background-color: ${({ primary }) => (primary ? '#FF706C' : '#eeeeee')};
  border: none;
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

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  text,
  helperText,
  confirmText = '확인',
  cancelText = '아니오',
  onConfirm,
  onCancel,
}) => {
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
