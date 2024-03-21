import Image from 'next/image';

import styled from '@emotion/styled';

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MainDescriptionBlock } from '#molecules/MainDescriptionBlock';
import { MainDescriptionCard } from '#molecules/MainDescriptionCard';

const Block = styled.div`
  position: relative;
  width: 1194px;
  margin: 258px 0 290px;
`;
const CardSwiper = styled(Swiper)`
  padding: 30px 0;
  pointer-events: none;
  .swiper-slide {
    width: max-content;
  }
`;
const BackgroundImage = styled(Image)`
  pointer-events: none;
  position: absolute;
  top: 30px;
  left: -360px;
`;
const BlurBlock = styled.div`
  position: absolute;
  top: 230px;
  right: 0;
  width: 400px;
  height: 650px;
  z-index: 1;
  pointer-events: none;
  background-image: linear-gradient(270deg, #fff 0.05%, rgba(255, 255, 255, 0) 132.02%);
`;

const CardInfo = [
  {
    width: 707,
    title: '랜덤 팀 매칭 시작',
    description: `내 프로필을 작성한 후 원하는 포지션의 사람들과 프로젝트 시작할\n준비를 해보세요! 그러면 최적의 랜덤 팀 매칭을 받을 수 있어요!`,
    imgUrl: '/images/main_matching_img1.svg',
    imgWidth: 330,
    imgHeight: 330,
    imgLeftPx: 60,
  },
  {
    width: 707,
    title: '대기방 생성',
    description: `프로젝트 최소 인원이 모이면 생성되는 대기방에서\n예비 팀원들과 대화를 나눠보세요!`,
    imgUrl: '/images/main_matching_img2.svg',
    imgWidth: 649,
    imgHeight: 328,
    imgLeftPx: -80,
  },
  {
    width: 707,
    title: '프로젝트 시작',
    description: `매칭 팀원들과 프로젝트를 시작해 보세요!\n만들어진 팀은 "내 프로젝트" 페이지에서 확인할 수 있어요.`,
    imgUrl: '/images/main_matching_img3.svg',
    imgWidth: 605,
    imgHeight: 328,
    imgLeftPx: -50,
  },
];

export const InfoMatchingBlock = () => {
  return (
    <Block>
      <MainDescriptionBlock
        title={'팀원 추천'}
        bigDescription={`내가 원하는 팀원과 함께 할 수 있는 기회`}
        smallDescription={'원하는 팀원의 특징을 설정해 추천을 받아보세요.'}
        buttonText={'추천 받기'}
        buttonLink={'/recommend'}
      />
      <CardSwiper
        slidesPerView={1.65}
        loop
        spaceBetween={26}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {CardInfo.map((card, index) => {
          return (
            <SwiperSlide key={index}>
              <MainDescriptionCard
                width={card.width}
                height={600}
                index={index + 1}
                title={card.title}
                description={card.description}
                imgUrl={card.imgUrl}
                imgWidth={card.imgWidth}
                imgHeight={card.imgHeight}
                // imgLeftPx={card.imgLeftPx}
              />
            </SwiperSlide>
          );
        })}
      </CardSwiper>
      <BackgroundImage
        src={'/images/main_matching_background.png'}
        width={553}
        height={656}
        alt={'background'}
      />
      <BlurBlock />
    </Block>
  );
};
