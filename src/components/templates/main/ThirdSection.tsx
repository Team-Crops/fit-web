'use client';

import Image from 'next/image';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  max-width: 1920px;
  padding: 552px 0 100px;
  margin: 0 auto;
  white-space: pre-wrap;
  text-align: center;
`;
const Title = styled(Txt)`
  display: block;
  margin-bottom: 400px;
`;
const BackgroundImage = styled(Image)`
  position: absolute;
  top: -70px;
  width: 100%;
  height: 2000px;
  pointer-events: none;
  z-index: -1;
`;
const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 373px;
  height: 136px;
  margin-bottom: 46px;
  border-radius: 23px;
  border: 1px solid #bdbdbd;
`;
const FilledBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 471px;
  height: 216px;
  margin: 39px 0 325px;
  border-radius: 23px;
  border: 1px solid #bdbdbd;
  background: #ff706c;
`;

export const ThirdSection = () => {
  return (
    <StyledSection>
      <Title size={'display1'} weight={'bold'} color="#000">
        이런 고민을 하고 있다면,{`\n`} F-IT을 시작하세요!
      </Title>
      <Txt size={'typo3'} weight={'medium'} color="#FF706C" marginBottom={45}>
        왜 F - IT일까?
      </Txt>
      <Txt size={'display1'} weight={'bold'} color="#000" marginBottom={20}>
        “이제는 F-IT이 팀원을 매칭 및 추천해드릴게요!”
      </Txt>
      <Txt size={'typo3'} weight={'medium'} color="#616161" marginBottom={113}>
        팀 프로젝트를 하고는 싶지만,{'\n'} 팀원을 구하기 어려운 대학/취준생 혹은 직장인을 위해
        준비했어요.
      </Txt>
      <Block>
        <Txt size={'typo3'} weight={'medium'} color="#616161">
          여러 구인 사이트에서{`\n`} 일일히 조건과 정보를 파악
        </Txt>
      </Block>
      <Image src={'/images/main_section3_arrow.svg'} alt={'arrow'} width={118} height={60} />
      <FilledBlock>
        <Txt size={'typo3'} weight={'medium'} color="#ffffffc4" marginBottom={12}>
          Sol
        </Txt>
        <Txt size={'typo2'} weight={'medium'} color="#fff">
          역할과 조건을 설정 후{`\n`} 자동으로 팀원 매칭 및 추천
        </Txt>
      </FilledBlock>
      <BackgroundImage
        src={'/images/main_section3_background.svg'}
        alt={'image'}
        width={0}
        height={0}
        sizes="100vw"
      />
    </StyledSection>
  );
};
