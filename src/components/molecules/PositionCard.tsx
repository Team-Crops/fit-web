import React from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { media } from '#/utilities';

interface PositionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  imageUrl: string;
  selected: boolean;

  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const PositionCard = ({ name, imageUrl, selected, onClick }: PositionCardProps) => {
  return (
    <Container selected={selected} onClick={onClick}>
      <PositionImageContainer>
        <Image src={imageUrl} alt={name} fill />
      </PositionImageContainer>
      <Txt size="typo4" weight={selected ? 'bold' : 'medium'} textAlign="center">
        {name}
      </Txt>
    </Container>
  );
};

const Container = styled.div<{ selected: boolean }>`
  cursor: pointer;

  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 180px;
  height: 200px;

  color: ${({ selected }) => (selected ? '#FF706C' : '#9e9e9e')};

  background: #fff;
  border: 1px solid ${({ selected }) => (selected ? '#ff706c' : '#fff')};
  border-radius: 20px;
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 10%);

  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 40px rgb(0 0 0 / 20%);
  }

  ${media.small} {
    width: 135px;
    height: 150px;
  }
`;

const PositionImageContainer = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 112px;
  height: 112px;

  background-color: #ffeae9;
  border-radius: 50%;

  ${media.small} {
    width: 84px;
    height: 84px;
  }
`;
