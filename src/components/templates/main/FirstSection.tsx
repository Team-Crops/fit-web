'use client';

import Image from 'next/image';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const StyledSection = styled.section`
  position: relative;

  display: flex;
  justify-content: center;

  width: 100%;
  height: 1117px;

  background-image: url('/images/main_first_section_background.svg');
  background-repeat: no-repeat;
  background-position: calc(50% - 210px) -135px;
`;
const ContentBlock = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 1200px;
  margin: 130px auto;
`;
const MainTxt = styled(Txt)`
  font-size: 80px;
`;
const CharacterImage = styled(Image)`
  pointer-events: none;
  position: absolute;
  top: 84px;
  margin-left: 330px;
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

        <CharacterImage
          src={'/images/firstSectionCharacter.svg'}
          alt="first-section"
          width={1094}
          height={901}
          sizes="100vw"
        />
      </ContentBlock>
    </StyledSection>
  );
};
