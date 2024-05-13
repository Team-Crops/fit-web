import { useMemo } from 'react';

import { usePositionsQuery } from '#/hooks/use-positions';
import { useRegionsQuery } from '#/hooks/use-regions';
import { useAuthStore } from '#/stores/auth';
import { BasicInfo } from '#molecules/MyPage/BasicInfo';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';
import { PositionBadge } from '#molecules/MyPage/PositionBadge';

export const ActivityInformation = () => {
  const user = useAuthStore((state) => state.user);
  const { data: positions } = usePositionsQuery();
  const { data: regions } = useRegionsQuery();
  const positionName = useMemo(() => {
    const position = positions?.find((v) => v.id === user?.positionId);
    return position?.displayName;
  }, [positions, user?.positionId]);

  if (user === null) return;
  return (
    <MyInfoBlock title={'활동'}>
      <MyPageGridBlock>
        <BasicInfo title={'포지션'} titleWidth={160} type={'reactNode'}>
          <PositionBadge position={positionName} selected={true} />
        </BasicInfo>
        <BasicInfo title={'주 활동 지역'} titleWidth={160} type={'string'}>
          {regions?.find((v) => v.id === user?.regionId)?.displayName}
        </BasicInfo>
        <BasicInfo title={'프로젝트 경험 수'} titleWidth={160} type={'string'}>
          {user.projectCount === 0
            ? '없음'
            : user.projectCount === 3
              ? `${user.projectCount}회 이상`
              : `${user.projectCount}회`}
        </BasicInfo>
        <BasicInfo title={'활동 가능 시간'} titleWidth={160} type={'string'}>
          {user?.activityHour ?? '-'}시간
        </BasicInfo>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
