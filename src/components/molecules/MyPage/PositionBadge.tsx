import { MouseEventHandler } from 'react';

import { Txt } from '#atoms/Text';
import styled from '@emotion/styled';

const BadgeBlock = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  padding: 0 24px;
  border-radius: 5px;
  border: 1px solid ${({ selected }) => (selected ? '#FF908D' : '#9E9E9E')};
  cursor: pointer;
`;

interface PositionBadgeProps {
  position: string;
  selected: boolean;
  onClick?: MouseEventHandler;
}
export const PositionBadge = ({ position, selected, onClick }: PositionBadgeProps) => {
  return (
    <BadgeBlock selected={selected} onClick={onClick}>
      <Txt size={'typo6'} weight={'regular'} color={selected ? '#FF908D' : '#9E9E9E'}>
        {position}
      </Txt>
    </BadgeBlock>
  );
};
