import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { Txt, TxtProps } from '#atoms/Text';

const Container = styled.div<{
  gap: LabelProps['gap'];
  direction: React.CSSProperties['flexDirection'];
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => gap};
  align-items: ${({ direction }) => (direction === 'row' ? 'center' : 'flex-start')};
`;

const LabelText = styled(Txt)`
  white-space: nowrap;
`;

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  position?: 'top' | 'left';
  gap?: React.CSSProperties['gap'];

  size?: TxtProps['size'];
  weight?: TxtProps['weight'];
  color?: TxtProps['color'];
}

export const Label: React.FC<LabelProps> = ({
  text,
  position = 'top',
  gap = '12px',
  size = 'typo5',
  weight = 'medium',
  color = '#9e9e9e',
  children,
  ...props
}) => {
  return (
    <Container
      gap={gap}
      direction={position === 'top' ? 'column' : position === 'left' ? 'row' : undefined}
      {...props}
    >
      <LabelText size={size} weight={weight} color={color}>
        {text}
      </LabelText>
      {children}
    </Container>
  );
};
