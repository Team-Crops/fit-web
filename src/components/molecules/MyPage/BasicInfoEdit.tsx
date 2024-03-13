import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const BasicInfoBlock = styled.div<Pick<BasicInfoProps, 'direction'>>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: center;
`;
const Title = styled.div<Pick<BasicInfoProps, 'direction'>>`
  display: flex;
  align-items: center;
  align-self: flex-start;
  height: 34px;
  ${({ direction }) =>
    direction === 'column' &&
    css`
      width: 100%;
    `}
`;
const InfoTitle = styled(Txt)<{ titleWidth: number }>`
  width: ${({ titleWidth }) => titleWidth}px;
`;
const Essential = styled(Txt)`
  width: 8px;
`;
const ChildrenBlock = styled.div`
  width: 100%;
  height: 100%;
`;
const Description = styled(Txt)`
  margin: 5px 0 0 auto;
`;

interface BasicInfoProps {
  title: string;
  titleWidth: number;
  essential?: boolean;
  direction?: 'row' | 'column';
  description?: string;
  children: React.ReactNode;
}
export const BasicInfoEdit = ({
  title,
  titleWidth,
  essential,
  direction = 'row',
  description,
  children,
}: BasicInfoProps) => {
  return (
    <BasicInfoBlock direction={direction}>
      <Title direction={direction}>
        <Essential size="typo5" weight="bold" color={'#FF0800'}>
          {essential && '*'}
        </Essential>
        <InfoTitle size={'typo5'} weight={'bold'} color={'#424242'} titleWidth={titleWidth}>
          {title}
        </InfoTitle>
        {description && (
          <Description size={'typo6'} weight="regular" color={'#9E9E9E'}>
            {description}
          </Description>
        )}
      </Title>
      <ChildrenBlock>{children}</ChildrenBlock>
    </BasicInfoBlock>
  );
};
