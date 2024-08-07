import { useEffect, useState } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';
import { Temporal } from '@js-temporal/polyfill';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { mutate } from 'swr';

import { matchingPageBackground1, matchingPageDoughnut } from '#/assets/images';
import { Icons, Txt } from '#/components/atoms';
import { MatchingButtons } from '#/components/molecules/MatchingButtons';
import { MatchingTalkBackground } from '#/components/molecules/MatchingTalkBackground';
import { ProfileCard } from '#/components/molecules/ProfileCard';
import { exampleUsers } from '#/entities';
import { MATCHING_QUERY_KEY, useMatchingQuery } from '#/hooks/use-matching';
import { isMatching } from '#/utilities/matching';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const QueuingContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 8px;

  height: 600px;
  padding: 60px 100px;

  background: linear-gradient(180deg, rgb(255 199 198 / 58%) -62.84%, rgb(255 199 198 / 0%) 100%);
  border: 1px solid #e0e0e0;
  border-radius: 10px;
`;

const BackgroundBubble1 = styled(MatchingTalkBackground)`
  position: absolute;
  top: 40%;
  left: 13%;
`;

const BackgroundBubble2 = styled(MatchingTalkBackground)`
  position: absolute;
  top: calc(40% + 65px);
  left: calc(13% + 135px);
  filter: blur(1px);
`;

const BackgroundBubble3 = styled(MatchingTalkBackground)`
  position: absolute;
  top: calc(40% + 115px);
  left: calc(13% + 60px);
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
  top: 160px;
  left: 420px;

  height: 380px;

  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);

  .swiper-slide-active {
    filter: blur(1px);
    transition: filter 750ms;
  }

  .swiper-slide :not(.swiper-slide-pref, .swiper-slide-active, .swiper-slide-next) {
    filter: blur(1px);
    transition: filter 750ms;
  }

  .swiper-wrapper {
    padding: 100px;
  }
`;

const StyledProfileCard = styled(ProfileCard)`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 11px;
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 10%);
`;

const BackgroundImage1 = styled(Image)`
  position: absolute;
  z-index: -1;
  right: 50px;
  bottom: 50px;
  transform: translateY(-10%);

  animation: float 4s ease-in-out infinite;
`;

const BackgroundDoughnut = styled(Image)`
  position: absolute;
  bottom: 100px;
  left: 35%;
  animation: float 2s ease-in-out infinite;
`;

interface MatchingQueuedProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MatchingWaiting = (props: MatchingQueuedProps) => {
  const [remainTime, setRemainTime] = useState('');

  const { data: matching } = useMatchingQuery();

  useEffect(() => {
    const calculateTimer = setInterval(() => {
      if (isMatching(matching)) {
        const expiredAt = Temporal.Instant.from(matching.expiredAt);
        const duration = expiredAt.since(Temporal.Now.instant());
        const totalHours = duration.total({ unit: 'hour' });
        const days = Math.floor(totalHours / 24);
        const hours = Math.floor(totalHours % 24);
        setRemainTime(`${days}일 ${hours}시간`);
      }
    }, 1000);
    const revalidateMatchingTimer = setInterval(() => mutate(MATCHING_QUERY_KEY), 5000);
    return () => {
      clearInterval(calculateTimer);
      clearInterval(revalidateMatchingTimer);
    };
  }, [matching]);

  return (
    <Container {...props}>
      <QueuingContainer>
        <ProgressIcon icon="progress" width={40} height={40} />
        <Txt size="typo2" weight="bold" marginBottom={8}>
          현재 매칭이 진행 중입니다.
        </Txt>
        <Txt size="typo5" weight="bold" color="#616161">
          최소인원 : 기획(1), 디자인(1), 서버(1), 클라이언트(1)
        </Txt>
        <Txt size="typo5" weight="bold" color="#4960D9">
          매칭 종료까지 남은 시간 : {remainTime}
        </Txt>

        <BackgroundBubble1 profilePosition="left" />
        <BackgroundBubble2 profilePosition="right" size="small" />
        <BackgroundBubble3 profilePosition="left" size="small" />
        <ProfileCardsSwiper
          slidesPerView={3}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          speed={750}
          direction={'vertical'}
          loop
          modules={[Autoplay, Pagination]}
        >
          {exampleUsers.map((user, index) => (
            <SwiperSlide key={index}>
              <StyledProfileCard user={user} size="small" randomProfileImage />
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
        <MatchingButtons.CancelButton />
        <MatchingButtons.LinkButton href="/">홈으로 이동</MatchingButtons.LinkButton>
      </MatchingButtons>
    </Container>
  );
};
