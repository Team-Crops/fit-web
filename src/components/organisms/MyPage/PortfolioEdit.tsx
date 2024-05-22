import { useCallback } from 'react';

import { useTempAuthStore } from '#/stores/tempAuth';
import { BasicInfoEdit } from '#molecules/MyPage/BasicInfoEdit';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';
import { RegisterPortfolioBlock } from '#molecules/MyPage/RegisterPortfolioBlock';
import { TechSelectBlock } from '#molecules/MyPage/TechSelectBlock';

export const PortfolioEdit = () => {
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const setTempUser = useTempAuthStore((state) => state.setTempUser);

  const onChangeTechList = useCallback(
    (skillId: number) => {
      if (tempUser === null) return;
      if (tempUser.skillIdList === null) setTempUser({ ...tempUser, skillIdList: [skillId] });
      else
        setTempUser({
          ...tempUser,
          skillIdList: tempUser.skillIdList?.includes(skillId)
            ? tempUser.skillIdList.filter((id) => id !== skillId)
            : [...tempUser.skillIdList, skillId],
        });
    },
    [setTempUser, tempUser]
  );

  return (
    <MyInfoBlock title={'포트폴리오'}>
      <MyPageGridBlock>
        <BasicInfoEdit title={'사용 가능한 기술/툴'} titleWidth={300} direction="column" essential>
          <TechSelectBlock value={tempUser?.skillIdList ?? []} onChange={onChangeTechList} />
        </BasicInfoEdit>
        <BasicInfoEdit
          title={'포트폴리오'}
          titleWidth={200}
          direction="column"
          essential
          description="포트폴리오 링크는 최대 4개까지 업로드 할 수 있습니다."
        >
          <RegisterPortfolioBlock />
        </BasicInfoEdit>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
