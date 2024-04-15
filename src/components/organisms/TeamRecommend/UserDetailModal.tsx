import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { UserProfile } from '#/components/atoms/UserProfile';
import { DataBlock } from '#/components/molecules/TeamRecommend/DataBlock';

const Background = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background: rgb(66 66 66 / 40%);
`;
const UserDetailBlock = styled.div`
  position: relative;
  width: 630px;
  background-color: #fff;
  border-radius: 10px;
`;
const TopBlock = styled.div`
  display: flex;
  gap: 37px;
  align-items: center;
  margin: 99px 61px 34px;
`;
const SummaryBlock = styled.div`
  display: block;
`;
const FlexBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 4px;
`;
const Position = styled(Txt)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 28px;
  padding: 0 17px;

  background-color: #ffeae9;
  border-radius: 33px;
`;
const Introduction = styled(Txt)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;

  line-height: 200%;
  word-break: keep-all;

  -webkit-line-clamp: 2;
`;
const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: calc(100% - 78px);
  margin: 0 39px 35px;
  padding: 27px;

  background-color: #f5f5f5;
  border-radius: 6px;
`;
const Contact = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-bottom: 48px;
`;
const ContactBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const CancelButton = styled(Icons)`
  cursor: pointer;
  position: absolute;
  top: 28px;
  left: 38px;
`;
const LikeButton = styled(Icons)`
  cursor: pointer;
  position: absolute;
  top: 28px;
  right: 31px;
`;

export const UserDetailModal = () => {
  return (
    <Background>
      <UserDetailBlock>
        <CancelButton icon={'cross'} width={22} height={22} color="#BDBDBD" />
        <LikeButton icon={'heart'} width={39} height={39} color="#BDBDBD" />
        <TopBlock>
          <UserProfile size={164} />
          <SummaryBlock>
            <FlexBlock>
              <Txt size="typo1" weight="bold" color="#212121">
                예진
              </Txt>
              <Position size={'typo5'} weight="regular" color="#FF706C">
                Planner
              </Position>
            </FlexBlock>
            <Introduction size="typo5" weight="medium" color="#616161">
              “좋은 분들과 함께 멋진 프로덕트를 만들고 싶어요 :)” “좋은 분들과 함께 멋진 프로덕트를
              만들고 싶어요 :)”
            </Introduction>
          </SummaryBlock>
        </TopBlock>
        <DataContainer>
          <DataBlock
            title={'사용가능한 기술/툴'}
            content={'Figma, photoShop Figma, photoShop,Figma, photoShop'}
          />
          <DataBlock title={'학력/경력'} content={'휴학생'} />
          <DataBlock title={'학교명'} content={'3번'} />
          <DataBlock title={'프로젝트 경험 수'} content={'3번'} />
          <DataBlock title={'주 활동지역'} content={'3번'} />
          <DataBlock title={'활동 가능 시간'} content={'3번'} />
          <DataBlock title={'주 활동지역'} content={'3번'} />
          <DataBlock title={'포트폴리오'} content={'3번'} />
        </DataContainer>

        <Contact>
          <ContactBlock>
            <Icons icon={'email'} width={20} height={20} />
            <Txt size="typo5" weight="regular" color="#424242">
              oyejin55@gmail.com
            </Txt>
          </ContactBlock>
          <ContactBlock>
            <Icons icon={'phoneFill'} width={20} height={20} />
            <Txt size="typo5" weight="regular" color="#424242">
              010-9295-9776
            </Txt>
          </ContactBlock>
        </Contact>
      </UserDetailBlock>
    </Background>
  );
};
