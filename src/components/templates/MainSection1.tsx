'use client';

import Image from 'next/image';

import styled from '@emotion/styled';

import {
  mainSection1Background,
  mainSection1Character,
  mainSection1Fragment1,
  mainSection1Fragment2,
  mainSection1Fragment3,
  mainSection1Logo,
} from '#/assets/images';
import { Txt } from '#/components/atoms';

export const MainSection1 = () => {
  return (
    <StyledSection>
      <ContentBlock>
        <Txt size={'typo3'} weight={'medium'} color="#757575">
          프로젝트를 방법으로 완성하기 위한 팀원 매칭 및 추천 서비스
        </Txt>
        <MainTxt size={'typo1'} weight={'bold'}>
          FIT 하게 F - IT 하자
        </MainTxt>
        <TopStick />
        <BottomVerticalStick />
        <WhiteCircle />
        <BottomHorizontalStick />

        <LogoImage src={mainSection1Logo} alt="shiny-fit-logo" width={200} height={300} />
        <CharacterImage src={mainSection1Character} alt="first-section" sizes="100vw" />
        <BackgroundAsset
          src={mainSection1Background}
          alt="background-asset"
          width={240}
          height={240}
        />
        <BackgroundFragment1 src={mainSection1Fragment1} alt="fragment-1" width={80} />
        <BackgroundFragment2 src={mainSection1Fragment2} alt="fragment-2" width={45} />
        <BackgroundFragment3 src={mainSection1Fragment3} alt="fragment-3" width={60} />
      </ContentBlock>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  overflow: hidden;
  display: flex;
  justify-content: center;

  width: 100%;
  height: 1100px;
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

const LogoImage = styled(Image)`
  position: absolute;
  z-index: -10;
  top: 180px;
  right: 450px;

  animation: float ease-in-out 2s infinite;
`;

const CharacterImage = styled(Image)`
  pointer-events: none;
  position: absolute;
  top: 80px;
  right: -30px;
`;

const BackgroundAsset = styled(Image)`
  position: absolute;
  top: 650px;
  right: -40px;
`;

const BackgroundFragment1 = styled(Image)`
  position: absolute;
  top: 850px;
  right: 80px;
`;

const BackgroundFragment2 = styled(Image)`
  position: absolute;
  top: 820px;
  right: -50px;
`;

const BackgroundFragment3 = styled(Image)`
  position: absolute;
  top: 750px;
  right: -80px;
`;

const GradationStick = styled.div`
  background: linear-gradient(270deg, #ff706ccc -10%, #ff706c00 100%);
  border-radius: 9999px;
`;

const TopStick = styled(GradationStick)`
  position: absolute;
  top: -50px;
  rotate: -15deg;

  width: 1800px;
  height: 260px;

  filter: blur(3px);
`;

const BottomVerticalStick = styled(GradationStick)`
  position: absolute;
  z-index: -10;
  top: 550px;
  left: 500px;
  transform-origin: 1370px 130px;
  transform: translate(-1370px, -130px) rotate(-15deg);

  width: 1500px;
  height: 260px;
`;

const BottomHorizontalStick = styled(GradationStick)`
  position: absolute;
  z-index: -10;
  top: 550px;
  left: 500px;
  transform-origin: 1370px 130px;
  transform: translate(-1370px, -130px) rotate(255deg);

  width: 1500px;
  height: 260px;

  background: linear-gradient(270deg, #ff706c77 -10%, #ff706c00 60%);
`;

const WhiteCircle = styled.div`
  position: absolute;
  top: 550px;
  left: 500px;
  transform-origin: 50% 50%;
  transform: translate(-50%, -50%);

  width: 75px;
  height: 75px;

  background-color: #fff;
  border-radius: 9999px;
`;
