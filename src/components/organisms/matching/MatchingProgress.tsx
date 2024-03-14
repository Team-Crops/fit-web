'use client';

import Image from 'next/image';

import styled from '@emotion/styled';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { matchingPageBackground1 } from '#/assets/images';
import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { ProfileCard } from '#/components/molecules/ProfileCard';
import { exampleUsers } from '#/entities/user';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 8px;

  height: 600px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(255, 199, 198, 0.58) -62.84%,
    rgba(255, 199, 198, 0) 100%
  );

  padding: 60px 100px;
`;

const ProgressIcon = styled(Icons)`
  position: absolute;
  top: 55px;
  left: 50px;
  animation: spin 2s linear infinite;
`;

const ProfileCardsSwiper = styled(Swiper)`
  position: absolute;
  height: 380px;

  mask-image: linear-gradient(to bottom, transparent, black 40%, black 60%, transparent);

  .swiper-slide-active {
    filter: blur(1px);
  }

  .swiper-slide :not(.swiper-slide-pref, .swiper-slide-active, .swiper-slide-next) {
    filter: blur(1px);
  }
`;

const StyledProfileCard = styled(ProfileCard)`
  border-radius: 11px;
  border: 1px solid #eee;
  background: #fff;

  box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
`;

const BackgroundImage1 = styled(Image)`
  position: absolute;
  right: 50px;
  bottom: 50px;

  z-index: -1;

  animation: spin 12s linear infinite;
`;

export function MatchingProgress() {
  return (
    <Container>
      <ProgressIcon icon="progress" width={40} height={40} />
      <Txt size="typo2" weight="bold">
        현재 매칭이 진행 중입니다.
      </Txt>
      <div style={{ height: '8px' }} />
      <Txt size="typo5" weight="bold" color="#616161">
        최소인원 : 기획(1), 디자인(1), 서버(1), 클라이언트(1)
      </Txt>
      <Txt size="typo5" weight="bold" color="#4960D9">
        매칭 종료까지 남은 시간 : 1일 22시간
      </Txt>
      <ProfileCardsSwiper
        slidesPerView={3}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        direction={'vertical'}
        loop
        modules={[Autoplay, Pagination]}
      >
        {exampleUsers.map((user, index) => (
          <SwiperSlide key={index}>
            <StyledProfileCard user={user} size="small" />
          </SwiperSlide>
        ))}
      </ProfileCardsSwiper>
      <BackgroundImage1
        src={matchingPageBackground1}
        alt="Background Asset 1"
        width={400}
        height={400}
      />
    </Container>
  );
}
