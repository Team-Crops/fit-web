import { MouseEventHandler } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const BadgeBlock = styled.div<{ selected: boolean }>`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 25px;
  padding: 0 24px;

  white-space: nowrap;

  background-color: ${({ selected }) => (selected ? '#ffffff' : 'transparent')};
  border: 1px solid ${({ selected }) => (selected ? '#FF908D' : '#9E9E9E')};
  border-radius: 5px;
`;

interface PositionBadgeProps {
  position?: string;
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
