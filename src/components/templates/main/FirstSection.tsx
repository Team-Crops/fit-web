'use client';

import Image from 'next/image';

import { Txt } from '#atoms/Text';
import styled from '@emotion/styled';

const StyledSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1920px;
  height: 1117px;
  margin: 0 auto;
  overflow: hidden;
`;
const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 130px 0;
  gap: 12px;
`;
const MainTxt = styled(Txt)`
  font-size: 80px;
`;
const BackgroundImage = styled(Image)`
  position: absolute;
  width: 135%;
  height: 2000px;
  top: -130px;
  pointer-events: none;
  z-index: -1;
`;

export const FirstSection = () => {
  return (
    <StyledSection>
      <ContentBlock>
        <Txt size={'typo3'} weight={'medium'} color="#757575">
          프로젝트를 방법으로 완성하기 위한 팀원 매칭 및 추천 서비스
        </Txt>
        <MainTxt size={'typo1'} weight={'bold'}>
          FIT 하게 F - IT 하자
        </MainTxt>
      </ContentBlock>
      <BackgroundImage
        src={'/img/firstSectionBackground.svg'}
        alt="first-section"
        width={0}
        height={0}
        sizes="100vw"
      />
    </StyledSection>
  );
};
