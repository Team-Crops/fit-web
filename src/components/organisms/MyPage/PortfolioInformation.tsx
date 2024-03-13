import styled from '@emotion/styled';

import { Icons } from '#atoms/Icons';
import { PortfolioTicket } from '#atoms/MyPage/PortfolioTicket';
import { Txt } from '#atoms/Text';
import { MyInfoBlock } from '#molecules/MyPage/MyInfoBlock';
import { MyPageGridBlock } from '#molecules/MyPage/MyPageGridBlock';

const FlexBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const TechBadge = styled(Txt)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 19px;
  padding: 0 17px;
  border-radius: 33px;
  background: #ffeae9;
`;
const TechListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const PortfolioContent = styled.div`
  display: flex;
  gap: 18px;
`;
const ClipBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 92px;
  height: 98px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  word-break: keep-all;
  text-align: center;
`;
const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100% - 110px);
`;
const Portfolio = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 25px;
  padding: 0 9px;
  border-radius: 5px;
  border: 1px solid #ff908d;
`;

export const PortfolioInformation = () => {
  return (
    <MyInfoBlock title={'포트폴리오'}>
      <MyPageGridBlock>
        <FlexBlock>
          <Txt size={'typo5'} weight={'bold'} color={'#9E9E9E'}>
            사용 가능한 기술/툴
          </Txt>
          <TechListWrapper>
            <TechBadge size={'typo6'} weight={'regular'} color="#FF706C">
              React
            </TechBadge>
            <TechBadge size={'typo6'} weight={'regular'} color="#FF706C">
              React
            </TechBadge>
            <TechBadge size={'typo6'} weight={'regular'} color="#FF706C">
              React
            </TechBadge>
            <TechBadge size={'typo6'} weight={'regular'} color="#FF706C">
              PhotoShop
            </TechBadge>
            <TechBadge size={'typo6'} weight={'regular'} color="#FF706C">
              PhotoShop
            </TechBadge>
            <TechBadge size={'typo6'} weight={'regular'} color="#FF706C">
              PhotoShop
            </TechBadge>
          </TechListWrapper>
        </FlexBlock>
        <FlexBlock>
          <Txt size={'typo5'} weight={'bold'} color={'#9E9E9E'}>
            포트폴리오
          </Txt>
          <PortfolioContent>
            <ClipBlock>
              <Icons icon="clip" width={28} height={26} />
              <Txt size={'typo6'} weight={'regular'} color={'#FF706C'}>
                EZ안_포트폴리오
              </Txt>
            </ClipBlock>
            <PortfolioList>
              <PortfolioTicket icon={'link'} text={'2023 ㅇㅇ사 포트폴리오'} />
              <PortfolioTicket icon={'link'} text={'2023 ㅇㅇ사 포트폴리오'} />
              <PortfolioTicket icon={'link'} text={'2023 ㅇㅇ사 포트폴리오'} />
              <PortfolioTicket icon={'link'} text={'2023 ㅇㅇ사 포트폴리오'} />
            </PortfolioList>
          </PortfolioContent>
        </FlexBlock>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
