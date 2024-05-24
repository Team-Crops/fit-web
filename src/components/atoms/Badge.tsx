import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import type { TxtProps } from '#/components/atoms/Text';

const StyledSpan = styled.span<{ background: BadgeProps['background'] }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: fit-content;
  padding: 2px 8px;

  forced-color-adjust: auto;
  background: ${({ background }) => background};
  border-radius: 100px;
`;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  background?: React.CSSProperties['background'];
  color?: React.CSSProperties['color'];

  size?: TxtProps['size'];
  weight?: TxtProps['weight'];
}

export const Badge: React.FC<BadgeProps> = ({
  background = '#ff706c52',
  color = '#ff706c',
  size = 'typo6',
  weight = 'regular',
  children,
  ...props
}) => {
  return (
    <StyledSpan background={background} {...props}>
      <Txt size={size} weight={weight} color={color}>
        {children}
      </Txt>
    </StyledSpan>
  );
};
