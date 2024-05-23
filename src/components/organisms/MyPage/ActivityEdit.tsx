import { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import { usePositionsQuery } from '#/hooks/use-positions';
import { useRegionsQuery } from '#/hooks/use-regions';
import { useTempAuthStore } from '#/stores/tempAuth';
import { Select } from '#atoms/Select';
import { BasicInfoEdit } from '#molecules/MyPage/BasicInfoEdit';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';
import { PositionBadge } from '#molecules/MyPage/PositionBadge';

const PositionBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;

  width: 90%;
  margin: 24px 0 0 8px;
`;
const FlexBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 32px;
`;

export const ActivityEdit = () => {
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const setTempUser = useTempAuthStore((state) => state.setTempUser);
  const { data: positions } = usePositionsQuery();
  const { data: regions } = useRegionsQuery();

  const handlePositionClick = useCallback(
    (positionId: number) => () => {
      if (tempUser === null) return;
      setTempUser({ ...tempUser, positionId });
    },
    [setTempUser, tempUser]
  );

  const handleUpdateTempUser = useCallback(
    (key: string, value: any) => {
      if (tempUser !== null) setTempUser({ ...tempUser, [key]: value });
    },
    [tempUser, setTempUser]
  );

  if (tempUser === null) return;
  return (
    <MyInfoBlock title={'활동'}>
      <MyPageGridBlock>
        <BasicInfoEdit title={'활동명'} titleWidth={100} direction="column" essential>
          <PositionBlock>
            {positions?.map((position) => (
              <PositionBadge
                key={position.id}
                position={position.displayName}
                selected={position.id === tempUser?.positionId}
                onClick={handlePositionClick(position.id)}
              />
            ))}
          </PositionBlock>
        </BasicInfoEdit>
        <FlexBlock>
          <BasicInfoEdit title={'프로젝트 경험 수'} titleWidth={172} essential>
            <Select
              value={tempUser.projectCount ?? 0}
              onChange={(e) => handleUpdateTempUser('projectCount', e.target.value)}
              width="130px"
              placeholder="선택하세요"
            >
              {[...Array(4)].map((_, i, arr) => (
                <Select.Option key={i} value={i}>
                  {i === 0 ? '없음' : i === arr.length - 1 ? `${i}회 이상` : `${i}회`}
                </Select.Option>
              ))}
            </Select>
          </BasicInfoEdit>
          <BasicInfoEdit title={'주 활동 지역'} titleWidth={172} essential>
            <Select
              value={tempUser.regionId ?? 0}
              onChange={(e) => handleUpdateTempUser('regionId', e.target.value)}
              width="130px"
              placeholder="선택하세요"
            >
              {regions?.map((region) => (
                <Select.Option key={region.id} value={region.id}>
                  {region.displayName}
                </Select.Option>
              ))}
            </Select>
          </BasicInfoEdit>
          <BasicInfoEdit title={'활동 가능 시간'} titleWidth={172} essential>
            <Select
              value={tempUser.activityHour ?? 0}
              onChange={(e) => handleUpdateTempUser('activityHour', e.target.value)}
              width="130px"
              placeholder="선택하세요"
            >
              {[3, 6, 12, 24].map((n) => (
                <Select.Option key={n} value={n}>
                  {n}시간
                </Select.Option>
              ))}
            </Select>
          </BasicInfoEdit>
        </FlexBlock>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
