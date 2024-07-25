import styled from '@emotion/styled';

import { Loading } from '#/components/atoms';
import { IconName } from '#/components/atoms/Icons';
import { PortfolioFileBlock } from '#/components/atoms/MyPage/PortfolioFileBlock';
import { useSkillsQuery } from '#/hooks/use-skills';
import { useMeQuery } from '#/hooks/use-user';
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

  background: #ffeae9;
  border-radius: 33px;
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
const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100% - 110px);
`;

export const PortfolioInformation = () => {
  const { data: me } = useMeQuery();
  const { data: skills } = useSkillsQuery();

  if (!me) return <Loading />;
  return (
    <MyInfoBlock title={'포트폴리오'}>
      <MyPageGridBlock>
        <FlexBlock>
          <Txt size={'typo5'} weight={'bold'} color={'#9E9E9E'}>
            사용 가능한 기술/툴
          </Txt>
          <TechListWrapper>
            {me.skillIdList &&
              me.skillIdList.map((skillId) => {
                const skill = skills?.find((v) => v.id === skillId);
                if (skill === undefined) return;
                return (
                  <TechBadge key={skill.id} size={'typo6'} weight={'regular'} color="#FF706C">
                    {skill?.displayName}
                  </TechBadge>
                );
              })}
          </TechListWrapper>
        </FlexBlock>
        <FlexBlock>
          <Txt size={'typo5'} weight={'bold'} color={'#9E9E9E'}>
            포트폴리오
          </Txt>
          <PortfolioContent>
            {me.portfolioUrl && <PortfolioFileBlock />}
            <PortfolioList>
              {me.linkList?.map((link) => (
                <PortfolioTicket
                  key={link.linkUrl}
                  icon={link.linkType.toLowerCase() as IconName}
                  text={link.linkUrl}
                />
              ))}
            </PortfolioList>
          </PortfolioContent>
        </FlexBlock>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
