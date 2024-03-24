'use client';

import Image from 'next/image';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const StyledSection = styled.section`
  position: relative;

  overflow: hidden;
  display: flex;
  justify-content: center;

  width: 100%;
  max-width: 1920px;
  height: 1117px;
  margin: 0 auto;
`;
const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 1200px;
  margin: 130px 0;
`;
const MainTxt = styled(Txt)`
  font-size: 80px;
`;
const CharacterImage = styled(Image)`
  pointer-events: none;

  position: absolute;
  z-index: -1;
  top: 190px;
  right: 100px;
`;
const RightBackground = styled(Image)`
  position: absolute;
  z-index: -2;
  top: -60px;
`;
const LeftBackground = styled(Image)`
  position: absolute;
  z-index: -2;
  top: 500px;
  left: 50px;
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
      <CharacterImage
        src={'/images/firstSectionCharacter.svg'}
        alt="first-section"
        width={1094}
        height={901}
        sizes="100vw"
      />
      <RightBackground
        src={'/images/firstSectionBackground1.svg'}
        alt={''}
        width={1644}
        height={646}
      />
      <LeftBackground
        src={'/images/firstSectionBackground2.svg'}
        alt={''}
        width={1222}
        height={1465}
      />
    </StyledSection>
  );
};
