import Image from 'next/image';

import styled from '@emotion/styled';

import { MainDescriptionBlock } from '#molecules/MainDescriptionBlock';
import { MainDescriptionCard } from '#molecules/MainDescriptionCard';

const Block = styled.div`
  position: relative;
  width: 1194px;
  margin-bottom: 389px;
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
    width: 592,
    title: '팀원 특징 설정',
    description: `구하려는 팀원의 포지션, 프로젝트 경험,\n보유한 기술 등을 선택해주세요!`,
    imgUrl: '/images/main_recommend_img1.svg',
    imgWidth: 361,
    imgHeight: 245,
  },
  {
    width: 583,
    title: '팀원 추천',
    description: `설정한 조건에 맞는\n예비 팀원들을 추천해줄게요!`,
    imgUrl: '/images/main_recommend_img2.svg',
    imgWidth: 358,
    imgHeight: 262,
  },
];

export const RecommendBlock = () => {
  return (
    <Block>
      <MainDescriptionBlock
        title={'랜덤 팀 매칭'}
        bigDescription={`클릭 한 번으로\n나와 꼭 맞는 팀과 매칭`}
        smallDescription={'기획-디자인-개발, 최적의 팀원들을 단 3일 안에 매칭!'}
        buttonText={'매칭하러 가기'}
        buttonLink={'/matchingInfo'}
      />
      <CardWrapper>
        {CardInfo.map((card, index) => {
          return (
            <MainDescriptionCard
              key={index}
              width={card.width}
              height={500}
              index={index + 1}
              title={card.title}
              description={card.description}
              imgUrl={card.imgUrl}
              imgWidth={card.imgWidth}
              imgHeight={card.imgHeight}
            />
          );
        })}
      </CardWrapper>
      <BackgroundImage
        src={'/images/main_recommend_background.png'}
        width={102}
        height={102}
        alt={'background'}
      />
    </Block>
  );
};
