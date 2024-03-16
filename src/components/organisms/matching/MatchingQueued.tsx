'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { matchingPageBackground1, matchingPageDoughnut } from '#/assets/images';
import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { MatchingButtons } from '#/components/molecules/matching/MatchingButtons';
import { MatchingTalkBackground } from '#/components/molecules/matching/MatchingTalkBackground';
import { ProfileCard } from '#/components/molecules/ProfileCard';
import { exampleUsers } from '#/entities/user';
import { MatchingStep, updateMatchingStep } from '#/redux/features/matching/slice';
import { useAppDispatch } from '#/redux/hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const QueuingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  position: relative;
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

const BackgroundBubble1 = styled(MatchingTalkBackground)`
  position: absolute;
  left: 13%;
  top: 40%;
`;

const BackgroundBubble2 = styled(MatchingTalkBackground)`
  position: absolute;
  left: calc(13% + 135px);
  top: calc(40% + 65px);

  filter: blur(1px);
`;

const BackgroundBubble3 = styled(MatchingTalkBackground)`
  position: absolute;
  left: calc(13% + 60px);
  top: calc(40% + 115px);

  filter: blur(1.5px);
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
  left: 520px;
  top: 160px;

  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);

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

  animation: float 4s ease-in-out infinite;

  transform: translateY(-10%);
`;

const BackgroundDoughnut = styled(Image)`
  position: absolute;
  left: 35%;
  bottom: 100px;

  animation: float 2s ease-in-out infinite;
`;

export function MatchingQueued() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const stopQueuing = useCallback(() => {
    dispatch(updateMatchingStep(MatchingStep.QUEUING - 1));
  }, [dispatch]);

  const goHome = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <Container>
      <QueuingContainer>
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

        <BackgroundBubble1 profilePosition="left" />
        <BackgroundBubble2 profilePosition="right" size="small" />
        <BackgroundBubble3 profilePosition="left" size="small" />
        <ProfileCardsSwiper
          slidesPerView={3}
          autoplay={{
            delay: 1000,
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
        <BackgroundDoughnut
          src={matchingPageDoughnut}
          alt="Background Asset 2"
          width={70}
          height={70}
        />
      </QueuingContainer>
      <MatchingButtons>
        <MatchingButtons.Button color="secondary" onClick={() => stopQueuing()}>
          매칭 중단하기
        </MatchingButtons.Button>
        <MatchingButtons.Button onClick={() => goHome()}>홈으로 이동</MatchingButtons.Button>
        <MatchingButtons.Button
          color="secondary"
          onClick={() => dispatch(updateMatchingStep(MatchingStep.MATCHED))}
        >
          FOR DEBUG: 매칭 완료
        </MatchingButtons.Button>
      </MatchingButtons>
    </Container>
  );
}
