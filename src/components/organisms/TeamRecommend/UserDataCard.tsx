import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { UserProfile } from '#/components/atoms/UserProfile';

const Card = styled.div`
  cursor: pointer;

  position: relative;
  top: 0;

  width: 100%;
  height: 235px;
  padding: 30px 37px;

  border: 1px solid #ffc7c6;
  border-radius: 10px;

  transition: all 0.2s ease-in-out;

  &:hover {
    top: -10px;
    border: 2px solid #ffc7c6;
    box-shadow: 0 0 40px 0 rgb(0 0 0 / 10%);
  }
`;
const TopBlock = styled.div`
  display: flex;
  gap: 37px;
  align-items: center;
  margin-bottom: 28px;
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

  height: 22px;
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
const BottomBlock = styled.div`
  display: flex;
  gap: 62px;
  white-space: nowrap;
`;
const Skills = styled(Txt)`
  overflow: hidden;
  width: 150px;
  text-overflow: ellipsis;
`;
const LikeButton = styled(Icons)`
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 18px;
`;

export const UserDataCard = () => {
  return (
    <Card>
      <TopBlock>
        <UserProfile size={120} />
        <SummaryBlock>
          <FlexBlock>
            <Txt size="typo3" weight="bold" color="#212121">
              예진
            </Txt>
            <Position size={'typo6'} weight="regular" color="#FF706C">
              Planner
            </Position>
          </FlexBlock>
          <Introduction size="typo6" weight="medium" color="#616161">
            “좋은 분들과 함께 멋진 프로덕트를 만들고 싶어요 :)”
          </Introduction>
        </SummaryBlock>
      </TopBlock>
      <BottomBlock>
        <Txt weight="regular" size="typo6" color="#616161">
          사용가능한 기술/툴
        </Txt>
        <Skills weight="medium" size="typo6" color="#212121">
          Figma, photoShop,Figma, photoShop,Figma, photoShop,
        </Skills>
      </BottomBlock>
      <LikeButton icon={'heart'} width={24} height={24} />
    </Card>
  );
};
