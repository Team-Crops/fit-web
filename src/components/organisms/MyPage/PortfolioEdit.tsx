import { BasicInfoEdit } from '#molecules/MyPage/BasicInfoEdit';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';
import { RegisterPortfolioBlock } from '#molecules/MyPage/RegisterPortfolioBlock';
import { TechSelectBlock } from '#molecules/MyPage/TechSelectBlock';

export const PortfolioEdit = () => {
  return (
    <MyInfoBlock title={'포트폴리오'}>
      <MyPageGridBlock>
        <BasicInfoEdit title={'사용 가능한 기술/툴'} titleWidth={300} direction="column" essential>
          <TechSelectBlock />
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
