import { MouseEventHandler, useCallback, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { UserProfile } from '#/components/atoms/UserProfile';
import { usePositionsQuery } from '#/hooks/use-positions';
import { RecommendUser, useRecommendLikeUserQuery } from '#/hooks/use-recommend';
import { useSkillsQuery } from '#/hooks/use-skills';

const Card = styled.div`
  cursor: pointer;

  position: relative;
  top: 0;

  width: 100%;
  height: 235px;
  padding: 30px 0 30px 37px;

  border: 1px solid #ffc7c6;
  border-radius: 10px;

  transition: all 0.2s ease-in-out;

  &:hover {
    top: -10px;
    padding: 29px 0 30px 36px;
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

  width: 180px;
  margin-bottom: 4px;
`;
const UserName = styled(Txt)`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;
const Position = styled(Txt)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 22px;
  padding: 0 17px;

  white-space: nowrap;

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

interface UserDataCardProps {
  userData: RecommendUser['recommendUserList'][0];
  onClick: (userId: number) => void;
}
export const UserDataCard = ({ userData, onClick }: UserDataCardProps) => {
  const [isLike, setIsLike] = useState(userData.isLiked);
  const { trigger: likeTrigger } = useRecommendLikeUserQuery();
  const positions = usePositionsQuery();
  const skills = useSkillsQuery();

  const onClickLike: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      likeTrigger({
        userId: userData.userSummary.userId,
        like: isLike,
      });
      setIsLike(!userData.isLiked);
    },
    [isLike, likeTrigger, userData.isLiked, userData.userSummary.userId]
  );

  return (
    <Card
      onClick={() => {
        onClick(userData.userSummary.userId);
      }}
    >
      <TopBlock>
        <UserProfile size={120} imageUrl={userData.userSummary.profileImageUrl} />
        <SummaryBlock>
          <FlexBlock>
            <UserName size="typo3" weight="bold" color="#212121">
              {userData.userSummary.username}
            </UserName>
            <Position size={'typo6'} weight="regular" color="#FF706C">
              {
                positions.data?.find((position) => position.id === userData.userSummary.positionId)
                  ?.displayName
              }
            </Position>
          </FlexBlock>
          <Introduction size="typo6" weight="medium" color="#616161">
            {userData.userSummary.introduce}
          </Introduction>
        </SummaryBlock>
      </TopBlock>
      <BottomBlock>
        <Txt weight="regular" size="typo6" color="#616161">
          사용가능한 기술/툴
        </Txt>
        <Skills weight="medium" size="typo6" color="#212121">
          {userData.userSummary.skillIdList?.map((skillId, index) => {
            const skill = skills.data?.find((skill) => skill.id === skillId);
            return (
              <>
                {skill?.displayName}
                {index !== (userData.userSummary.skillIdList ?? []).length - 1 && ', '}
              </>
            );
          })}
        </Skills>
      </BottomBlock>
      <LikeButton
        icon={isLike ? 'heartFill' : 'heart'}
        width={24}
        height={24}
        onClick={onClickLike}
      />
    </Card>
  );
};
