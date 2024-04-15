'use client';

import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { getRegions } from '#/actions/region';
import { Icons } from '#/components/atoms/Icons';
import { Label } from '#/components/atoms/Label';
import { Select } from '#/components/atoms/Select';
import { Txt } from '#/components/atoms/Text';
import { Region } from '#/entities/region';
import { useUser } from '#/hooks/use-user';
import { useSignUpStore } from '#/stores/sign-up';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const SubmissionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const TimeAvailabilitySubmission = () => {
  const [data, setData] = useState<{
    projectCount: number | null;
    regionId: number | null;
    activityHour: number | null;
  }>({
    projectCount: null,
    regionId: null,
    activityHour: null,
  });

  const [regions, setRegions] = useState<Region[]>([]);

  const { data: user, mutate: mutateUser, isError } = useUser();
  const setOnForward = useSignUpStore((store) => store.setOnForward);

  useEffect(() => {
    async function fetchRegions() {
      const regions = await getRegions();
      setRegions(regions);
    }
    fetchRegions();
  }, []);

  useEffect(() => {
    if (user) {
      setData({
        projectCount: user.projectCount ?? null,
        regionId: user.regionId ?? null,
        activityHour: user.activityHour ?? null,
      });
    }
  }, [user]);

  useEffect(() => {
    const { projectCount, regionId, activityHour } = data;

    if (projectCount && regionId && activityHour) {
      setOnForward(async () => {
        await mutateUser({ projectCount, regionId, activityHour });
        return !isError;
      });
    } else {
      setOnForward(null);
    }
  }, [data, isError, setOnForward, mutateUser]);

  return (
    <Container>
      <TitleContainer>
        <Txt size="typo1" weight="bold">
          나의 프로젝트 경험과 활동 정보를 알려주세요
        </Txt>
        <Txt size="typo4" weight="medium" color="#bdbdbd">
          거의 다 왔어요. 조금만 더 화이팅!{' '}
          <Icons icon="emojiHoldingBackTears" width={20} height={20} />
        </Txt>
      </TitleContainer>
      <SubmissionsContainer>
        <Label text="프로젝트 경험 수">
          <Select
            value={data.projectCount ?? 0}
            onChange={(e) => setData({ ...data, projectCount: parseInt(e.target.value, 10) })}
          >
            {[...Array(4)].map((_, i, arr) => (
              <Select.Option key={i} value={i}>
                {i === 0 ? '없음' : i === arr.length - 1 ? `${i}회 이상` : `${i}회`}
              </Select.Option>
            ))}
          </Select>
        </Label>
        <Label text="주 활동 지역">
          <Select
            value={data.regionId ?? 0}
            onChange={(e) => setData({ ...data, regionId: parseInt(e.target.value, 10) })}
          >
            {regions.map((region) => (
              <Select.Option key={region.id} value={region.id}>
                {region.displayName}
              </Select.Option>
            ))}
          </Select>
        </Label>
        <Label text="활동 가능 시간">
          <Select
            value={data.activityHour ?? 0}
            onChange={(e) => setData({ ...data, activityHour: parseInt(e.target.value, 10) })}
          >
            {[3, 6, 12, 24].map((n) => (
              <Select.Option key={n} value={n}>
                {n}시간
              </Select.Option>
            ))}
          </Select>
        </Label>
      </SubmissionsContainer>
      <div />
    </Container>
  );
};
