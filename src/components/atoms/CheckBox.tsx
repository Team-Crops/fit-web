import { forwardRef, type InputHTMLAttributes } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CheckIcon from 'src/assets/icons/check.svg';

const StyledCheckIcon = styled(CheckIcon)`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  width: 14px;
  height: 14px;
`;

const inputColorCSS = css`
  border-color: #9e9e9e;
  background-color: #ffffff;

  &:disabled {
    border-color: #eeeeee;
    background-color: #ffffff;
  }

  &:checked {
    border-color: #ff706c;
    background-color: #ffffff;

    + ${StyledCheckIcon} {
      display: block;
      stroke: #ff706c;
    }
  }

  &:checked:disabled {
    border-color: #ffc7c6;
    background-color: #ffffff;

    + ${StyledCheckIcon} {
      display: block;
      stroke: #ffc7c6;
    }
  }
`;

const StyledContainer = styled.div`
  display: inline-block;
  position: relative;
  padding: 0;
  padding-inline: 0;
  padding-block: 0;

  width: 24px;
  height: 24px;
`;

const StyledInput = styled.input`
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

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ checked, ...props }, ref) => (
    <StyledContainer>
      <StyledInput ref={ref} type="checkbox" checked={checked} {...props} />
      <StyledCheckIcon />
    </StyledContainer>
  )
);

CheckBox.displayName = 'CheckBox';
