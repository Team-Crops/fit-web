import { CSSProperties, HTMLAttributes } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TxtSizeCSS = ({ size, weight }: TxtProps) => {
  switch (size) {
    case 'typo0':
      return css`
        font-size: 36px;
        letter-spacing: ${weight === 'bold' ? '-1.08px' : '-1.8px'};
      `;
    case 'typo1':
      return css`
        font-size: 30px;
        letter-spacing: ${weight === 'bold' ? '-0.9px' : '-1.5px'};
      `;
    case 'typo2':
      return css`
        font-size: 26px;
        letter-spacing: ${weight === 'bold' ? '-0.78px' : '-1.3px'};
      `;
    case 'typo3':
      return css`
        font-size: 24px;
        letter-spacing: ${weight === 'bold' ? '-0.72px' : '-1.2px'};
      `;
    case 'typo4':
      return css`
        font-size: 20px;
        letter-spacing: ${weight === 'bold' ? '-0.6px' : '-1px'};
      `;
    case 'typo5':
      return css`
        font-size: 16px;
        letter-spacing: ${weight === 'bold' ? '-0.48px' : '-0.8px'};
      `;
    case 'typo6':
      return css`
        font-size: 12px;
        letter-spacing: ${weight === 'bold' ? '-0.36px' : '-0.6px'};
      `;
    case 'main1':
      return css`
        font-size: 50px;
        letter-spacing: -1.5px;
      `;
    case 'main2':
      return css`
        font-size: 48px;
        letter-spacing: -1.44px;
      `;
  }
};

export const TxtWeightCSS = ({ weight }: TxtProps) => {
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
  display: block;

  margin-bottom: ${({ marginBottom }) => marginBottom}px;

  line-height: 1.5;
  color: ${({ color }) => color};
  text-align: ${({ textAlign }) => textAlign};

  ${TxtSizeCSS}
  ${TxtWeightCSS}
`;

export interface TxtProps extends TextareaProps {
  marginBottom?: number;
  textAlign?: CSSProperties['textAlign'];
}

export const Txt: React.FC<TxtProps> = ({
  size = 'typo4',
  weight = 'medium',
  color = 'inherit',
  marginBottom = 0,
  children,
  ...props
}) => {
  return (
    <StyledTxt size={size} weight={weight} color={color} marginBottom={marginBottom} {...props}>
      {children}
    </StyledTxt>
  );
};

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  size?: 'typo0' | 'typo1' | 'typo2' | 'typo3' | 'typo4' | 'typo5' | 'typo6' | 'main1' | 'main2';
  weight?: 'bold' | 'medium' | 'regular';
}

export const Textarea = styled.textarea<TxtProps>`
  display: block;
  line-height: 1.5;
  color: ${({ color }) => color};

  ${TxtSizeCSS}
  ${TxtWeightCSS}
`;
