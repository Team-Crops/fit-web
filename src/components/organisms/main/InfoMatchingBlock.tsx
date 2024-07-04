import Image from 'next/image';

import styled from '@emotion/styled';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  mainSection3Matching1,
  mainSection3Matching2,
  mainSection3Matching3,
  mainSection3MatchingBackground,
} from '#/assets/images';
import { MainDescriptionBlock } from '#molecules/MainDescriptionBlock';
import { MainDescriptionCard } from '#molecules/MainDescriptionCard';

const CardInfo = [
  {
    title: '랜덤 팀 매칭 시작',
    description: `내 프로필을 작성한 후 원하는 포지션의 사람들과 프로젝트 시작할 준비를 해보세요! 그러면 최적의 랜덤 팀 매칭을 받을 수 있어요!`,
    image: mainSection3Matching1,
  },
  {
    title: '대기방 생성',
    description: `프로젝트 최소 인원이 모이면 생성되는 대기방에서 예비 팀원들과 대화를 나눠보세요!`,
    image: mainSection3Matching2,
  },
  {
    title: '프로젝트 시작',
    description: `매칭 팀원들과 프로젝트를 시작해 보세요! 만들어진 팀은 "내 프로젝트" 페이지에서 확인할 수 있어요.`,
    image: mainSection3Matching3,
  },
];

export const InfoMatchingBlock = () => {
  return (
    <Block>
      <MainDescriptionBlock
        title={'랜덤 팀 매칭'}
        bigDescription={`클릭 한 번으로\n나와 꼭 맞는 팀과 매칭`}
        smallDescription={'기획-디자인-개발, 최적의 팀원들을 단 3일 안에 매칭!'}
        buttonText={'매칭하러 가기'}
        buttonLink={'/matching-info'}
      />
      <CardSwiper
        modules={[Autoplay]}
        spaceBetween={40}
        slidesPerView={1.65}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {CardInfo.map((card, index) => (
          <SwiperSlide key={index}>
            <MainDescriptionCard
              width={700}
              height={600}
              index={index + 1}
              title={card.title}
              description={card.description}
              image={card.image}
            />
          </SwiperSlide>
        ))}
      </CardSwiper>
      <BackgroundImage src={mainSection3MatchingBackground} alt={'clipboard'} width={550} />
      <BlurBlock />
    </Block>
  );
};

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

const CardSwiper = styled(Swiper)`
  width: 1235px;

  .swiper-wrapper {
    padding: 40px;
  }
`;

const BackgroundImage = styled(Image)`
  pointer-events: none;
  position: absolute;
  top: 30px;
  left: -360px;
`;

const BlurBlock = styled.div`
  pointer-events: none;

  position: absolute;
  z-index: 1;
  top: 230px;
  right: 0;

  width: 400px;
  height: 650px;

  background-image: linear-gradient(270deg, #fff 0.05%, rgb(255 255 255 / 0%) 132.02%);
`;
