import styled from '@emotion/styled';

import { Txt } from '#/components/atoms/Text';

interface StyledBlockProps {
  fullColumn?: boolean;
  direction?: 'column' | 'row';
}
const StyledBlock = styled.div<StyledBlockProps>`
  display: flex;
  ${({ direction }) => direction === 'column' && 'flex-direction: column;'}
  ${({ fullColumn }) => fullColumn && 'grid-column: 1 / 3;'}
`;
const Title = styled(Txt)<{ titleWidth?: number }>`
  width: ${({ titleWidth }) => titleWidth + 'px'};
`;
const ChildrenBlock = styled.div<{ titleWidth?: number }>`
  width: ${({ titleWidth }) => `calc(100% - ${titleWidth}px)`};
  height: 100%;
`;

interface FilterProps {
  title: string;
  titleWidth: number;
  children: React.ReactNode;
  fullColumn?: boolean;
  direction?: 'column' | 'row';
}
export const Filter = ({
  title,
  titleWidth,
  children,
  fullColumn,
  direction = 'row',
}: FilterProps) => {
  return (
    <StyledBlock fullColumn={fullColumn} direction={direction}>
      <Title size="typo5" weight="medium" titleWidth={titleWidth}>
        {title}
      </Title>
      <ChildrenBlock titleWidth={titleWidth}>{children}</ChildrenBlock>
    </StyledBlock>
  );
};
