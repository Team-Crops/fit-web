'use client';

import Image from 'next/image';

import styled from '@emotion/styled';

import { mainSection2 } from '#/assets/images';
import { Txt } from '#/components/atoms';

export const MainSection2 = () => {
  return (
    <StyledSection>
      <ContentBlock>
        <Txt size={'typo3'} weight={'medium'} color="#616161">
          팀 프로젝트를 시작하고 싶은 나,
        </Txt>
        <Txt size={'main1'} weight={'bold'} color="#000">
          어떻게 팀원을 구하지?
        </Txt>
        <ImageContainer>
          <Image
            src={mainSection2}
            alt={'Speech bubbles discussing new project member challenges'}
            style={{ objectFit: 'contain' }}
            fill
          />
        </ImageContainer>
      </ContentBlock>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  justify-content: center;

  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding-bottom: 100px;

  background: linear-gradient(180deg, #f0f3ffff, #f0f3ff00);
`;

const ContentBlock = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 1200px;
  margin-top: 200px;
`;

const ImageContainer = styled.div`
  position: relative;
  height: calc(100vw * ${mainSection2.height / mainSection2.width});
`;
