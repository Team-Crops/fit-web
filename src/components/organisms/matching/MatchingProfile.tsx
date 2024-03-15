'use client';

import { HTMLAttributes, useMemo } from 'react';

import styled from '@emotion/styled';

import _ from 'lodash';

import { ProfileCard } from '#/components/molecules/ProfileCard';
import { useGetRegionsQuery } from '#/redux/features/region/api';
import { useGetSkillsQuery } from '#/redux/features/skill-set/api';
import { useAppSelector } from '#/redux/hooks';
import { Txt } from '#atoms/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  border-radius: 10px;
  border: 1px solid #bdbdbd;
  padding: 32px 35px;
  margin: 40px auto;

  width: 100%;
  max-width: 760px;
`;

const Details = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  border-radius: 5px;
  background: #f5f5f5;
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

export function MatchingProfile({ ...props }: MatchingProfileProps) {
  const me = useAppSelector((state) => state.user.me);
  const { data: skills } = useGetSkillsQuery();
  const { data: regions } = useGetRegionsQuery();

  const mySkillNames = useMemo(
    () => _.uniq(me?.skillIdList).map((id) => skills?.find((s) => s.id === id)?.displayName),
    [me?.skillIdList, skills]
  );

  const details: { name: string; value: string }[] = useMemo(
    () => [
      { name: '학력/경력', value: me?.backgroundStatus ?? '' },
      { name: '학교명', value: me?.backgroundText ?? '' },
      { name: '사용가능한 기술/툴', value: mySkillNames.join(', ') },
      { name: '프로젝트 경험 수', value: `${me?.projectCount ?? 0}번` },
      {
        name: '주 활동지역',
        value: regions?.find((r) => r.id === me?.regionId)?.displayName ?? '',
      },
      { name: '활동 가능 시간', value: `${me?.activityHour ?? 0}시간` },
      { name: '포트폴리오', value: me?.portfolioUrl ?? '' },
    ],
    [me, mySkillNames, regions]
  );

  return (
    <>
      <Container {...props}>
        {me && <ProfileCard user={me} size="large" />}
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
      </Container>
    </>
  );
}
