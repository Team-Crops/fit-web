import Image from 'next/image';

import styled from '@emotion/styled';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  mainSection3Recommend1,
  mainSection3Recommend2,
  mainSection3RecommendBackground,
} from '#/assets/images';
import { MainDescriptionBlock } from '#molecules/MainDescriptionBlock';
import { MainDescriptionCard } from '#molecules/MainDescriptionCard';

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
      <CardSwiper
        modules={[Autoplay]}
        spaceBetween={40}
        slidesPerView={1.85}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {CardInfo.concat(CardInfo).map((card, index) => (
          <SwiperSlide key={index}>
            <MainDescriptionCard
              width={600}
              height={500}
              index={(index % 2) + 1}
              title={card.title}
              description={card.description}
              image={card.image}
            />
          </SwiperSlide>
        ))}
        <BackgroundImage src={mainSection3RecommendBackground} alt={'background'} />
      </CardSwiper>
    </Block>
  );
};

const Block = styled.div`
  position: relative;

  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
  gap: 80px;
  align-items: center;

  width: 100vw;
  padding: 20px;
`;

const CardSwiper = styled(Swiper)`
  position: relative;
  width: 1200px;

  .swiper-wrapper {
    padding: 40px;
  }

  .swiper-slide {
    transition: opacity 400ms;
  }

  .swiper-slide-prev {
    opacity: 0;
  }

  .swiper-slide-next {
    &::after {
      content: '';

      position: absolute;
      z-index: 10;
      top: -40px;
      left: -40px;

      width: calc(100% + 80px);
      height: calc(100% + 80px);

      background: linear-gradient(90deg, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 100%) 80%);
    }
  }
`;

const BackgroundImage = styled(Image)`
  pointer-events: none;
  position: absolute;
  bottom: -70px;
  left: -75px;
`;
