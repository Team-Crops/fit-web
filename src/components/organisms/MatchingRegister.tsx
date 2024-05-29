'use client';

import { type HTMLAttributes, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import _ from 'lodash';
import { mutate } from 'swr';

import { MatchingButtons } from '#/components/molecules/matching/MatchingButtons';
import { ProfileCard } from '#/components/molecules/ProfileCard';
import { MATCHING_QUERY_KEY, useMatchingStartMutation } from '#/hooks/use-matching';
import { useRegionsQuery } from '#/hooks/use-regions';
import { useSkillsQuery } from '#/hooks/use-skills';
import { useMeQuery } from '#/hooks/use-user';
import { getBackgroundStatusText } from '#/utilities';
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
  const { data: me } = useMeQuery();
  const { trigger: startMatching, isMutating: isStarting } = useMatchingStartMutation();

  const mySkillNames = useMemo(
    () => _.uniq(me?.skillIdList).map((id) => skills?.find((s) => s.id === id)?.displayName),
    [skills, me?.skillIdList]
  );

  const router = useRouter();

  const details: { name: string; value: string }[] = useMemo(
    () => [
      { name: '학력/경력', value: getBackgroundStatusText(me?.backgroundStatus) ?? '-' },
      { name: '학교명', value: me?.backgroundText ?? '-' },
      { name: '사용가능한 기술/툴', value: mySkillNames.join(', ') },
      { name: '프로젝트 경험 수', value: `${me?.projectCount ?? '-'}번` },
      {
        name: '주 활동지역',
        value: regions?.find((r) => r.id === me?.regionId)?.displayName ?? '-',
      },
      { name: '활동 가능 시간', value: `${me?.activityHour ?? '-'}시간` },
      { name: '포트폴리오', value: me?.portfolioUrl ?? '-' },
    ],
    [
      mySkillNames,
      regions,
      me?.activityHour,
      me?.backgroundStatus,
      me?.backgroundText,
      me?.portfolioUrl,
      me?.projectCount,
      me?.regionId,
    ]
  );

  return (
    <Container>
      <ProfileContainer {...props}>
        <ProfileCard user={me ?? null} size="large" />
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
        <MatchingButtons.Button
          disabled={isStarting}
          onClick={async () => {
            mutate(MATCHING_QUERY_KEY, await startMatching());
          }}
        >
          확인
        </MatchingButtons.Button>
      </MatchingButtons>
    </Container>
  );
};
