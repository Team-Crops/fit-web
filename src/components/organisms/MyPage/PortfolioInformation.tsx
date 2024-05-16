import styled from '@emotion/styled';

import { PortfolioFileBlock } from '#/components/atoms/MyPage/PortfolioFileBlock';
import { useSkillsQuery } from '#/hooks/use-skills';
import { useAuthStore } from '#/stores/auth';
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
const ClipBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  width: 92px;
  height: 98px;
  padding: 0 10px;

  text-align: center;
  word-break: keep-all;

  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;
const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100% - 110px);
`;

export const PortfolioInformation = () => {
  const user = useAuthStore((state) => state.user);
  const { data: skills } = useSkillsQuery();

  if (user === null) return;
  return (
    <MyInfoBlock title={'포트폴리오'}>
      <MyPageGridBlock>
        <FlexBlock>
          <Txt size={'typo5'} weight={'bold'} color={'#9E9E9E'}>
            사용 가능한 기술/툴
          </Txt>
          <TechListWrapper>
            {user.skillIdList &&
              user.skillIdList.map((skillId) => {
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
            {user.portfolioUrl && <PortfolioFileBlock />}
            <PortfolioList>
              {user.linkList?.map((link) => (
                <PortfolioTicket key={link.linkUrl} icon={'link'} text={link.linkUrl} />
              ))}
            </PortfolioList>
          </PortfolioContent>
        </FlexBlock>
      </MyPageGridBlock>
    </MyInfoBlock>
  );
};
