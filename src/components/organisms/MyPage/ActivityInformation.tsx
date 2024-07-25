import { useMemo } from 'react';

import { Loading } from '#/components/atoms';
import { usePositionsQuery } from '#/hooks/use-positions';
import { useRegionsQuery } from '#/hooks/use-regions';
import { useMeQuery } from '#/hooks/use-user';
import { BasicInfo } from '#molecules/MyPage/BasicInfo';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';
import { PositionBadge } from '#molecules/MyPage/PositionBadge';

export const ActivityInformation = () => {
  const { data: me } = useMeQuery();
  const { data: positions } = usePositionsQuery();
  const { data: regions } = useRegionsQuery();
  const positionName = useMemo(() => {
    const position = positions?.find((v) => v.id === me?.positionId);
    return position?.displayName;
  }, [positions, me?.positionId]);

  if (me === null) return <Loading />;
  return (
    <MyInfoBlock title={'활동'}>
      <MyPageGridBlock>
        <BasicInfo title={'포지션'} titleWidth={160} type={'reactNode'}>
          <PositionBadge position={positionName} selected={true} />
        </BasicInfo>
        <BasicInfo title={'주 활동 지역'} titleWidth={160} type={'string'}>
          {regions?.find((v) => v.id === me?.regionId)?.displayName}
        </BasicInfo>
        <BasicInfo title={'프로젝트 경험 수'} titleWidth={160} type={'string'}>
          {me?.projectCount === 0
            ? '없음'
            : me?.projectCount === 3
              ? `${me?.projectCount}회 이상`
              : `${me?.projectCount}회`}
        </BasicInfo>
        <BasicInfo title={'활동 가능 시간'} titleWidth={160} type={'string'}>
          {me?.activityHour ?? '-'}시간
        </BasicInfo>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
