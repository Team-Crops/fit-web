'use client';

import { type HTMLAttributes, type MouseEventHandler, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import _ from 'lodash';

import { MatchingButtons } from '#/components/molecules/matching/MatchingButtons';
import { ProfileCard } from '#/components/molecules/ProfileCard';
import { useMatchingStart } from '#/hooks/use-matching';
import { useRegionsQuery } from '#/hooks/use-regions';
import { useSkillsQuery } from '#/hooks/use-skills';
import { useAuthStore } from '#/stores/auth';
import { Txt } from '#atoms/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;

  width: 100%;
  max-width: 760px;
  padding: 32px;

  border: 1px solid #bdbdbd;
  border-radius: 10px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  background: #f5f5f5;
  border-radius: 5px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  max-width: 540px;
  padding: 25px 30px;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface MatchingProfileProps extends HTMLAttributes<HTMLDivElement> {}

export const MatchingRegister = ({ ...props }: MatchingProfileProps) => {
  const { data: skills } = useSkillsQuery();
  const { data: regions } = useRegionsQuery();
  const { trigger: matchingStart } = useMatchingStart();

  const user = useAuthStore((store) => store.user);
  const mySkillNames = useMemo(
    () => _.uniq(user?.skillIdList).map((id) => skills?.find((s) => s.id === id)?.displayName),
    [skills, user?.skillIdList]
  );

  const router = useRouter();

  const details: { name: string; value: string }[] = useMemo(
    () => [
      { name: '학력/경력', value: user?.backgroundStatus ?? '-' },
      { name: '학교명', value: user?.backgroundText ?? '-' },
      { name: '사용가능한 기술/툴', value: mySkillNames.join(', ') },
      { name: '프로젝트 경험 수', value: `${user?.projectCount ?? '-'}번` },
      {
        name: '주 활동지역',
        value: regions?.find((r) => r.id === user?.regionId)?.displayName ?? '-',
      },
      { name: '활동 가능 시간', value: `${user?.activityHour ?? '-'}시간` },
      { name: '포트폴리오', value: user?.portfolioUrl ?? '-' },
    ],
    [
      mySkillNames,
      regions,
      user?.activityHour,
      user?.backgroundStatus,
      user?.backgroundText,
      user?.portfolioUrl,
      user?.projectCount,
      user?.regionId,
    ]
  );

  return (
    <Container>
      <ProfileContainer {...props}>
        <ProfileCard user={user} size="large" />
        <Details>
          <DetailsContainer>
            {details.map((detail, index) => (
              <DetailContainer key={index}>
                <Txt size="typo5" weight="regular" color="#616161">
                  {detail.name}
                </Txt>
                <Txt size="typo5" weight="medium">
                  {detail.value}
                </Txt>
              </DetailContainer>
            ))}
          </DetailsContainer>
        </Details>
      </ProfileContainer>
      <MatchingButtons>
        <MatchingButtons.Button color="secondary" onClick={() => router.push('/mypage')}>
          수정하기
        </MatchingButtons.Button>
        <MatchingButtons.Button onClick={() => matchingStart()}>확인</MatchingButtons.Button>
      </MatchingButtons>
    </Container>
  );
};
