'use client';
import Link from 'next/link';

import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';
import { Txt } from '#/components/atoms/Text';
import { MatchingInfoImage } from '#/components/organisms/MatchingInfo/MatchingInfoImage';

const StyledSection = styled.section`
  width: 100%;
  height: 985px;
  background-color: #f0f3ff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentBlock = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 130px 0 0 0;
`;

export const MatchingInfoSection = () => {
  return (
    <StyledSection>
      <ContentBlock>
        <Txt size="typo0" weight="bold" color="#000" marginBottom={28}>
          랜덤 팀 매칭
        </Txt>
        <Txt size="typo4" weight="regular" color="#000" marginBottom={9}>
          기획-디자인-개발, 최적의 팀원들을 단 3일 만에 매칭!
        </Txt>
        <Txt size="typo4" weight="regular" color="#000" marginBottom={37}>
          마이페이지에 설정된 본인의 정보와 핏 유저들의 정보를 조합하여 랜덤 팀 매칭을 시작합니다.
        </Txt>
        <Link href="/matching">
          <Button variant={'round'} height={'70'} color={'primary'}>
            매칭 시작하기
          </Button>
        </Link>
      </ContentBlock>
      <MatchingInfoImage />
    </StyledSection>
  );
};
