import styled from '@emotion/styled';

import { Badge } from '#/components/atoms/Badge';
import { Txt } from '#/components/atoms/Text';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  width: 100%;
  max-width: 600px;
  border-radius: 5px;
  padding: 16px 40px;
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 120px;
  background: #f5f5f5;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
`;

const ProfileNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export function MatchingProfileCard() {
  return (
    <ProfileContainer>
      <ProfileImage />
      <ProfileInfoContainer>
        <ProfileNameContainer>
          <Txt size="typo3" weight="bold">
            EZ안
          </Txt>
          <Badge>Designer</Badge>
        </ProfileNameContainer>
        <Txt size="typo5" weight="medium" color="#616161">
          “좋은 분들과 함께 멋진 프로덕트를 만들고 싶어요 :)”
        </Txt>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
}
