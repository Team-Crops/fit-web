import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ButtonHTMLAttributes, ReactNode } from 'react';

const ButtonVariantsCSS = ({ variant }: ButtonProps) => {
  switch (variant) {
    case 'angular':
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
        padding: 0 8px;
        height: 20px;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: -0.6px;
      `;
    case '30':
      return css`
        padding: 0 24px;
        height: 30px;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: -0.6px;
      `;
    case '50':
      return css`
        padding: 0 48px;
        height: 50px;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: -1px;
      `;
    case '60':
      return css`
        padding: 0 27px;
        height: 60px;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.6px;
      `;
    case '70':
      return css`
        padding: 0 37px;
        height: 70px;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.6px;
      `;
  }
};
const ButtonColorCSS = ({ color }: ButtonProps) => {
  switch (color) {
    case 'primary':
      return css`
        background-color: #ff706c;
        &:hover {
          background-color: #ee5550;
        }
      `;
    case 'secondary':
      return css`
        background-color: #bdbdbd;
        &:hover {
          background-color: #9e9e9e;
        }
      `;
  }
};
const StyledButton = styled.button<ButtonProps>`
  border: none;
  color: #ffffff;
  ${ButtonVariantsCSS}
  ${ButtonSizeCSS}
  ${ButtonColorCSS};
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'angular' | 'round';
  height: '20' | '30' | '50' | '60' | '70';
  color: 'primary' | 'secondary';
  children?: ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
