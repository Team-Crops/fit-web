import { HTMLAttributes } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const TxtSizeCSS = ({ size, weight }: TxtProps) => {
  switch (size) {
    case 'typo1':
      return css`
        font-size: 1.5rem;
        letter-spacing: ${weight === 'bold' ? '-0.9px' : '-1.5px'};
      `;
    case 'typo2':
      return css`
        font-size: 1.3rem;
        letter-spacing: ${weight === 'bold' ? '-0.78px' : '-1.3px'};
      `;
    case 'typo3':
      return css`
        font-size: 1.2rem;
        letter-spacing: ${weight === 'bold' ? '-0.72px' : '-1.2px'};
      `;
    case 'typo4':
      return css`
        font-size: 1rem;
        letter-spacing: ${weight === 'bold' ? '-0.6px' : '-1px'};
      `;
    case 'typo5':
      return css`
        font-size: 0.8rem;
        letter-spacing: ${weight === 'bold' ? '-0.48px' : '-0.8px'};
      `;
    case 'typo6':
      return css`
        font-size: 0.6rem;
        letter-spacing: ${weight === 'bold' ? '-0.36px' : '-6px'};
      `;
  }
};
const TxtWeightCSS = ({ weight }: TxtProps) => {
  switch (weight) {
    case 'bold':
      return css`
        font-weight: 700;
      `;
    case 'medium':
      return css`
        font-weight: 500;
      `;
    case 'regular':
      return css`
        font-weight: 400;
      `;
  }
};
const StyledTxt = styled.span<TxtProps>`
  color: ${({ color }) => color};
  ${TxtSizeCSS}
  ${TxtWeightCSS}
`;

interface TxtProps extends HTMLAttributes<HTMLSpanElement> {
  size: 'typo1' | 'typo2' | 'typo3' | 'typo4' | 'typo5' | 'typo6';
  weight: 'bold' | 'medium' | 'regular';
  color?: string;
}

export const Txt = ({ children, color = '#333', ...props }: TxtProps) => {
  return (
    <StyledTxt color={color} {...props}>
      {children}
    </StyledTxt>
  );
};
