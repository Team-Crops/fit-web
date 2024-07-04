import Image from 'next/image';

import styled from '@emotion/styled';

import {
  mainSection3Recommend1,
  mainSection3Recommend2,
  mainSection3RecommendBackground,
} from '#/assets/images';
import { MainDescriptionBlock } from '#molecules/MainDescriptionBlock';
import { MainDescriptionCard } from '#molecules/MainDescriptionCard';

const Block = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 80px;

  width: 100vw;
  max-width: 1920px;
  padding: 20px;
`;
const CardWrapper = styled.div`
  display: flex;
  gap: 19px;
`;
const BackgroundImage = styled(Image)`
  pointer-events: none;
  position: absolute;
  top: 815px;
  left: -105px;
`;

const CardInfo = [
  {
    title: '팀원 특징 설정',
    description: `구하려는 팀원의 포지션, 프로젝트 경험,\n보유한 기술 등을 선택해주세요!`,
    image: mainSection3Recommend1,
  },
  {
    title: '팀원 추천',
    description: `설정한 조건에 맞는\n예비 팀원들을 추천해줄게요!`,
    image: mainSection3Recommend2,
  },
];

export const IntroRecommendBlock = () => {
  return (
    <Block>
      <MainDescriptionBlock
        title={'팀원 추천'}
        bigDescription={`내가 원하는 팀원과 함께 할 수 있는 기회`}
        smallDescription={'원하는 팀원의 특징을 설정해 추천을 받아보세요.'}
        buttonText={'추천 받기'}
        buttonLink={'/team-recommend'}
      />
      <CardWrapper>
        {CardInfo.map((card, index) => (
          <MainDescriptionCard
            key={index}
            width={600}
            height={500}
            index={index + 1}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </CardWrapper>
      <BackgroundImage src={mainSection3RecommendBackground} alt={'background'} />
    </Block>
  );
};
