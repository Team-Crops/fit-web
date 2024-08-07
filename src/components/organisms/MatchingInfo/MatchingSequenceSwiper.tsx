import { useCallback, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import {
  mainSection3Matching1,
  mainSection3Matching2,
  mainSection3Matching3,
} from '#/assets/images';
import { Icons } from '#/components/atoms/Icons';
import { MainDescriptionCard } from '#/components/molecules/MainDescriptionCard';

const Container = styled.div`
  position: relative;
  width: 707px;
  margin-bottom: 89px;
  padding: 30px 0;

  /* overflow: hidden; */
`;
const CardSwiper = styled(Swiper)`
  overflow: visible;
  width: 707px;

  .swiper-slide {
    width: max-content;
  }
`;
const PrevButton = styled.div`
  cursor: pointer;

  position: absolute;
  z-index: 2;
  top: 50%;
  left: -130px;
  transform: translateY(-50%);
`;
const NextButton = styled.div`
  cursor: pointer;

  position: absolute;
  z-index: 2;
  top: 50%;
  right: -130px;
  transform: translateY(-50%) rotate(180deg);
`;
const BlurBackground = styled.div`
  pointer-events: none;

  position: absolute;
  z-index: 1;
  top: 30px;

  width: 830px;
  height: 600px;
`;
const LeftBlurBackground = styled(BlurBackground)`
  left: -860px;
  background-image: linear-gradient(90deg, #fff 0.05%, rgb(255 255 255 / 0%) 132.02%);
`;
const RightBlurBackground = styled(BlurBackground)`
  right: -860px;
  background-image: linear-gradient(270deg, #fff 0.05%, rgb(255 255 255 / 0%) 132.02%);
`;

const CardInfo = [
  {
    width: 707,
    title: '랜덤 팀 매칭 시작',
    description: `내 프로필을 작성한 후 원하는 포지션의 사람들과 프로젝트 시작할\n준비를 해보세요! 그러면 최적의 랜덤 팀 매칭을 받을 수 있어요!`,
    image: mainSection3Matching1,
  },
  {
    width: 707,
    title: '대기방 생성',
    description: `프로젝트 최소 인원이 모이면 생성되는 대기방에서\n예비 팀원들과 대화를 나눠보세요!`,
    image: mainSection3Matching2,
  },
  {
    width: 707,
    title: '프로젝트 시작',
    description: `매칭 팀원들과 프로젝트를 시작해 보세요!\n만들어진 팀은 "내 프로젝트" 페이지에서 확인할 수 있어요.`,
    image: mainSection3Matching3,
  },
];
export const MatchingSequenceSwiper = () => {
  const sliderRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);
  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      const swiper = sliderRef.current.swiper;

      swiper.on('slideChange', () => {
        setActiveIndex(swiper.activeIndex);
      });
    }
  }, []);

  return (
    <Container>
      <CardSwiper
        slidesPerView={1}
        spaceBetween={26}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay]}
        ref={sliderRef}
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
                image={card.image}
              />
            </SwiperSlide>
          );
        })}
        {activeIndex !== 0 && (
          <PrevButton onClick={handlePrev}>
            <Icons icon={'arrowBackward'} width={65} height={65} color="#00000091" />
          </PrevButton>
        )}
        {activeIndex !== CardInfo.length - 1 && (
          <NextButton onClick={handleNext}>
            <Icons icon={'arrowBackward'} width={65} height={65} />
          </NextButton>
        )}
      </CardSwiper>
      <LeftBlurBackground />
      <RightBlurBackground />
    </Container>
  );
};
