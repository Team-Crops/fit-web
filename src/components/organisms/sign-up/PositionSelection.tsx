import { useEffect, useState } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import { getPositions } from '#/actions/skill-set';
import { positionPageBackground1, positionPageBackground2 } from '#/assets/images';
import { Txt } from '#/components/atoms/Text';
import { PositionCard } from '#/components/molecules/PositionCard';
import { Position } from '#/entities/position';
import { useAuthStore } from '#/stores/auth';
import { useSignUpStore } from '#/stores/sign-up';
import { getStorageUrl } from '#/utilities/get-storage';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
  align-items: center;
`;

const PositionCards = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 40px;
  justify-content: center;
`;

const BackgroundImage1 = styled(Image)`
  position: absolute;
  top: 470px;
  left: 30px;
  transform: rotate(-15deg);

  width: 221px;
  height: 221px;

  filter: blur(1.5px);
`;

const BackgroundImage2 = styled(Image)`
  position: absolute;
  top: 200px;
  left: 750px;

  width: 69px;
  height: 69px;

  filter: blur(1px);
`;

export const PositionSelection = () => {
  const [positions, setPositions] = useState<Position[] | null>(null);

  const user = useAuthStore((store) => store.user);
  const setOnForward = useSignUpStore((store) => store.setOnForward);

  useEffect(() => {
    async function fetchPositions() {
      const fetched = await getPositions();
      setPositions(fetched);
    }

    fetchPositions();
  }, []);

  useEffect(() => {
    setOnForward(() => user?.positionId !== undefined);
  }, [setOnForward, user]);

  return (
    <Container>
      <Txt size="typo1" weight="bold">
        {user?.nickname}님의 포지션을 설정해주세요!
      </Txt>
      <PositionContainer>
        <PositionCards>
          {positions &&
            positions.map(({ id, displayName, imageUrl }) => (
              <PositionCard
                key={id}
                id={id}
                name={displayName}
                imageUrl={getStorageUrl(imageUrl)}
                selected={id === user?.positionId}
              />
            ))}
        </PositionCards>
      </PositionContainer>
      <div />

      <BackgroundImage1 src={positionPageBackground1} alt="" width={221} height={221} />
      <BackgroundImage2 src={positionPageBackground2} alt="" width={69} height={69} />
    </Container>
  );
};
