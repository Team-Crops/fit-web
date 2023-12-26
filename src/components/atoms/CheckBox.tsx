import styled from '@emotion/styled';
import React from 'react';

import type { InputHTMLAttributes } from 'react';

import CheckIcon from 'src/assets/icons/check.svg';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

const StyledContainer = styled.div`
  position: relative;

  width: 20px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const StyledInput = styled.input<CheckBoxProps>`
  appearance: none;

  width: 20px;
  height: 20px;
  flex-shrink: 0;

  border-radius: 2px;
  border: 1px solid ${({ checked, disabled }) => (checked && !disabled ? '#ff706c' : '#BDBDBD')};
  background-color: ${({ checked, disabled }) => (checked && !disabled ? '#ff706c' : '#ffffff')};
`;

const StyledCheckIcon = styled(CheckIcon)<CheckBoxProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 14px;
  height: 14px;
  stroke: ${({ disabled }) => (disabled ? '#bdbdbd' : '#ffffff')};
`;

export function CheckBox({ checked, ...props }: CheckBoxProps) {
  return (
    <StyledContainer>
      <StyledInput type="checkbox" checked={checked} {...props} />
      {checked && <StyledCheckIcon {...props} />}
    </StyledContainer>
  );
}
