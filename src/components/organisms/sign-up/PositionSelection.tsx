import Image from 'next/image';

import styled from '@emotion/styled';

import { positionPageBackground1, positionPageBackground2 } from '#/assets/images';
import { Txt } from '#/components/atoms/Text';
import { PositionCard } from '#/components/molecules/PositionCard';
import { usePositionsQuery } from '#/hooks/use-positions';
import type { User } from '#/types';
import { media } from '#/utilities';
import { getStorageUrl } from '#/utilities/storage';

interface PositionSelectionProps {
  user: User;

  onUserModified: (user: Partial<User>) => void;
}

export const PositionSelection: React.FC<PositionSelectionProps> = ({ user, onUserModified }) => {
  const { data: positions } = usePositionsQuery();

  return (
    <Container>
      <Txt size="typo1" weight="bold">
        {user.nickname}님의 포지션을 설정해주세요!
      </Txt>
      <PositionContainer>
        <PositionCards>
          {positions &&
            positions.map(({ id, displayName, imageUrl }) => (
              <PositionCard
                key={id}
                name={displayName}
                imageUrl={getStorageUrl(imageUrl)}
                selected={id === user.positionId}
                onClick={() => onUserModified({ positionId: id })}
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

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 32px;
  align-items: center;

  padding: 0 10px;
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

  ${media.small} {
    gap: 10px;
  }
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
