import { BasicInfo } from '#molecules/MyPage/BasicInfo';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';
import { PositionBadge } from '#molecules/MyPage/PositionBadge';

export const ActivityInformation = () => {
  return (
    <MyInfoBlock title={'활동'}>
      <MyPageGridBlock>
        <BasicInfo title={'포지션'} titleWidth={160} type={'reactNode'}>
          <PositionBadge position={'기획자'} selected={true} />
        </BasicInfo>
        <BasicInfo title={'주 활동 지역'} titleWidth={160} type={'string'}>
          서울시 노원구
        </BasicInfo>
        <BasicInfo title={'프로젝트 경험 수'} titleWidth={160} type={'string'}>
          2번
        </BasicInfo>
        <BasicInfo title={'활동 가능 시간'} titleWidth={160} type={'string'}>
          오후 5~10시
        </BasicInfo>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
