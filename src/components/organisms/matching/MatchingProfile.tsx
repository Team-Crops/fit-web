import styled from '@emotion/styled';

import { Badge } from '#/components/atoms/Badge';
import { Txt } from '#/components/atoms/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  border-radius: 10px;
  border: 1px solid #bdbdbd;
  padding: 32px 35px;
  margin: 40px auto;

  width: 100%;
  max-width: 760px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 490px;
  border-radius: 5px;
`;

const ProfileImage = styled.div`
  width: 128px;
  height: 128px;
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

const Details = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  border-radius: 5px;
  background: #f5f5f5;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  max-width: 490px;
  padding: 25px 30px;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function MatchingProfile() {
  return (
    <Container>
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
      <Details>
        <DetailsContainer>
          <DetailContainer>
            <Txt size="typo5" weight="regular" color="#616161">
              학력/경력
            </Txt>
            <Txt size="typo5" weight="medium">
              휴학생
            </Txt>
          </DetailContainer>
          <DetailContainer>
            <Txt size="typo5" weight="regular" color="#616161">
              학교명
            </Txt>
            <Txt size="typo5" weight="medium">
              서울과학기술대학교
            </Txt>
          </DetailContainer>
          <DetailContainer>
            <Txt size="typo5" weight="regular" color="#616161">
              사용가능한 기술/툴
            </Txt>
            <Txt size="typo5" weight="medium">
              Figma, Photoshop
            </Txt>
          </DetailContainer>
          <DetailContainer>
            <Txt size="typo5" weight="regular" color="#616161">
              프로젝트 경험 수
            </Txt>
            <Txt size="typo5" weight="medium">
              3번
            </Txt>
          </DetailContainer>
        </DetailsContainer>
      </Details>
    </Container>
  );
}
