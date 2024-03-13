'use client';

import { HTMLAttributes } from 'react';

import styled from '@emotion/styled';

import { ProfileCard } from '#/components/molecules/ProfileCard';
import { useAppSelector } from '#/redux/hooks';
import { Txt } from '#atoms/Text';

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
  max-width: 540px;
  padding: 25px 30px;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface MatchingProfileProps extends HTMLAttributes<HTMLDivElement> {}

export function MatchingProfile({ ...props }: MatchingProfileProps) {
  const me = useAppSelector((state) => state.user.me);

  return (
    <Container {...props}>
      {me && <ProfileCard user={me} size="large" />}
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
