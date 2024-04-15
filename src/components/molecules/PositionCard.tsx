'use client';

import Image from 'next/image';

import styled from '@emotion/styled';

import { useUser } from '#/hooks/use-user';
import { User } from '#/types/user';
import { Txt } from '../atoms/Text';

const Container = styled.div<{ selected: boolean }>`
  cursor: pointer;

  z-index: 1;

  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;

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
`;

const PositionImageContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 112px;
  height: 112px;

  background-color: #ffeae9;
  border-radius: 50%;
`;

interface PositionCardProps {
  id: User['positionId'];
  name: string;
  imageUrl: string;
  selected: boolean;
}

export const PositionCard = ({ id, name, imageUrl, selected }: PositionCardProps) => {
  const { data: user, mutate: mutateUser } = useUser();

  return (
    <Container selected={selected} onClick={() => mutateUser({ positionId: id })}>
      <PositionImageContainer>
        <Image src={imageUrl} width={130} height={130} alt={name} />
      </PositionImageContainer>
      <Txt size="typo4" weight={id === user?.positionId ? 'bold' : 'medium'}>
        {name}
      </Txt>
    </Container>
  );
};
