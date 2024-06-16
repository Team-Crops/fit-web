import { forwardRef, type InputHTMLAttributes } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';

const StyledIcon = styled(Icons)`
  pointer-events: none;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: none;

  width: 14px;
  height: 14px;
`;

const inputColorCSS = css`
  background-color: #fff;
  border-color: #9e9e9e;

  &:disabled {
    background-color: #fff;
    border-color: #eee;
  }

  &:checked {
    background-color: #fff;
    border-color: #ff706c;

    + ${StyledIcon} {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ff706c;
    }
  }

  &:checked:disabled {
    background-color: #fff;
    border-color: #ffc7c6;

    + ${StyledIcon} {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffc7c6;
    }
  }
`;

const StyledContainer = styled.div`
  position: relative;

  display: inline-block;

  width: 24px;
  height: 24px;
  padding: 0;
  padding-block: 0;
  padding-inline: 0;
`;

const StyledInput = styled.input`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  flex-shrink: 0;

  width: 20px;
  height: 20px;
  margin: 2px;

  appearance: none;
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;

  ${inputColorCSS}
`;

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ checked, onClick, ...props }, ref) => (
    <StyledContainer>
      <StyledInput
        ref={ref}
        type="checkbox"
        checked={checked}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) {
            onClick(e);
          }
        }}
        {...props}
      />
      <StyledIcon icon="check" useCSSColor />
    </StyledContainer>
  )
);

CheckBox.displayName = 'CheckBox';
