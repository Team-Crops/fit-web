'use client';

import { type HTMLAttributes, type MouseEventHandler, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import _ from 'lodash';

import { MatchingButtons } from '#/components/molecules/matching/MatchingButtons';
import { ProfileCard } from '#/components/molecules/ProfileCard';
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

export const MatchingProfile = ({ ...props }: MatchingProfileProps) => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.user.me);
  const { data: skills } = useGetSkillsQuery();
  const { data: regions } = useGetRegionsQuery();

  const router = useRouter();

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

  const editButtonClickHandler = useCallback<MouseEventHandler>(() => {
    router.push('/mypage');
  }, [router]);

  const okButtonClickHandler = useCallback<MouseEventHandler>(() => {
    dispatch(updateMatchingStep(MatchingStep.QUEUING));
  }, [dispatch]);

  return (
    <Container>
      <ProfileContainer {...props}>
        <ProfileCard user={me} size="large" />
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
        <MatchingButtons.Button color="secondary" onClick={editButtonClickHandler}>
          수정하기
        </MatchingButtons.Button>
        <MatchingButtons.Button onClick={okButtonClickHandler}>확인</MatchingButtons.Button>
      </MatchingButtons>
    </Container>
  );
};
