import type { InputHTMLAttributes } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CheckIcon from 'src/assets/icons/check.svg';

function inputColorCSS({ checked, disabled }: CheckBoxProps) {
  // background-color: ${({ checked, disabled }) => (checked && !disabled ? '#ff706c' : '#ffffff')};
  if (checked && !disabled) {
    return css`
      border-color: #ff706c;
      background-color: #ffffff;
    `;
  } else if (checked && disabled) {
    return css`
      border-color: #ffc7c6;
      background-color: #ffffff;
    `;
  } else if (!checked && !disabled) {
    return css`
      border-color: #9e9e9e;
      background-color: #ffffff;
    `;
  } else if (!checked && disabled) {
    return css`
      border-color: #eeeeee;
      background-color: #ffffff;
    `;
  } else {
    throw new Error(`Invalid props: checked: ${checked}, disabled: ${disabled}`);
  }
}

const StyledContainer = styled.div`
  display: inline-block;
  position: relative;
  padding: 0;
  padding-inline: 0;
  padding-block: 0;

  width: 24px;
  height: 24px;
`;

const StyledInput = styled.input<CheckBoxProps>`
  appearance: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  margin: 2px;

  width: 20px;
  height: 20px;
  flex-shrink: 0;

  border-width: 1px;
  border-style: solid;
  border-radius: 2px;

  ${inputColorCSS}
`;

const StyledCheckIcon = styled(CheckIcon)<CheckBoxProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  width: 14px;
  height: 14px;
  stroke: ${({ disabled }) => (disabled ? '#ffc7c6' : '#ff706c')};
`;

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function CheckBox({ checked, ...props }: CheckBoxProps) {
  return (
    <StyledContainer>
      {checked === undefined ? (
        <StyledInput type="checkbox" {...props} />
      ) : (
        <StyledInput type="checkbox" checked={checked} {...props} />
      )}
      {checked && <StyledCheckIcon {...props} />}
    </StyledContainer>
  );
}
