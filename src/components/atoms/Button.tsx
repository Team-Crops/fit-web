import { ButtonHTMLAttributes, ReactNode } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const ButtonVariantsCSS = ({ variant }: ButtonProps) => {
  switch (variant) {
    case 'angular':
    case 'outlined':
      return css`
        border-radius: 5px;
      `;
    case 'round':
      return css`
        border-radius: 50px;
      `;
  }
};
const ButtonSizeCSS = ({ height }: ButtonProps) => {
  switch (height) {
    case '20':
      return css`
        height: 20px;
        padding: 0 8px;
        font-size: 12px;
        font-weight: 400;
      `;
    case '30':
      return css`
        height: 30px;
        padding: 0 24px;
        font-size: 12px;
        font-weight: 400;
      `;
    case '50':
      return css`
        height: 50px;
        padding: 0 48px;
        font-size: 20px;
        font-weight: 500;
      `;
    case '60':
      return css`
        height: 60px;
        padding: 0 27px;
        font-size: 20px;
        font-weight: 700;
      `;
    case '70':
      return css`
        height: 70px;
        padding: 0 37px;
        font-size: 20px;
        font-weight: 700;
      `;
  }
};
const ButtonColorCSS = ({ variant, color, disabled }: ButtonProps) => {
  if (variant === 'outlined') {
    switch (color) {
      case 'primary':
        return css`
          color: #ff706c;
          background-color: #fff;
          border: 1px solid #ff706c;

          &:hover {
            background-color: #ffeae9;
          }
        `;
      case 'secondary':
        return css`
          color: #bdbdbd;
          background-color: #fff;
          border: 1px solid #bdbdbd;

          &:hover {
            background-color: #fafafa;
          }
        `;
    }
  } else {
    switch (color) {
      case 'primary':
        return css`
          color: ${disabled ? '#FFC7C6' : '#ffffff'};
          background-color: ${disabled ? '#FFA7A5' : '#ff706c'};

          &:hover {
            color: ${disabled ? '#FFC7C6' : '#E0E0E0'};
            background-color: ${disabled ? '#FFA7A5' : '#ee5550'};
          }
        `;
      case 'secondary':
        return css`
          color: ${disabled ? '#9E9E9E' : '#000000'};
          background-color: ${disabled ? '#EEEEEE' : '#bdbdbd'};

          &:hover {
            background-color: ${disabled ? '#EEEEEE' : '#9e9e9e'};
          }
        `;
    }
  }
};
const StyledButton = styled.button<ButtonProps>`
  color: #fff;
  letter-spacing: -0.6px;

  border: none;

  transition-duration: 0.2s;
  transition-property: background-color color;
  ${ButtonVariantsCSS}
  ${ButtonSizeCSS}
  ${ButtonColorCSS};
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'angular' | 'round' | 'outlined';
  height: '20' | '30' | '50' | '60' | '70';
  color: 'primary' | 'secondary';
  children?: ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
