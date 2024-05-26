import { useCallback } from 'react';

import styled from '@emotion/styled';

import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { UserProfile } from '#/components/atoms/UserProfile';
import { usePositionsQuery } from '#/hooks/use-positions';
import { useRecommendLikeUserMutation } from '#/hooks/use-recommend';
import { useSkillsQuery } from '#/hooks/use-skills';
import { RecommendUser } from '#/types';

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
  user: RecommendUser;
  onClick: () => void;
  mutateCachedLike: (
    userId: number,
    isLiked: boolean | Promise<boolean>,
    optimisticIsLiked: boolean
  ) => void;
}
export const UserDataCard = ({ user, onClick, mutateCachedLike }: UserDataCardProps) => {
  const positions = usePositionsQuery();
  const skills = useSkillsQuery();
  const { trigger: mutateUserLike } = useRecommendLikeUserMutation();

  const onLikeClick: React.MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      mutateCachedLike(
        user.id,
        mutateUserLike({ userId: user.id, like: !user.isLiked }),
        !user.isLiked
      );
    },
    [mutateCachedLike, mutateUserLike, user.id, user.isLiked]
  );

  return (
    <Card onClick={onClick}>
      <TopBlock>
        <UserProfile size={120} imageUrl={user.profileImageUrl} />
        <SummaryBlock>
          <FlexBlock>
            <UserName size="typo3" weight="bold" color="#212121">
              {user.nickname}
            </UserName>
            <Position size={'typo6'} weight="regular" color="#FF706C">
              {positions.data?.find((position) => position.id === user.positionId)?.displayName}
            </Position>
          </FlexBlock>
          <Introduction size="typo6" weight="medium" color="#616161">
            {user.introduce}
          </Introduction>
        </SummaryBlock>
      </TopBlock>
      <BottomBlock>
        <Txt weight="regular" size="typo6" color="#616161">
          사용가능한 기술/툴
        </Txt>
        <Skills weight="medium" size="typo6" color="#212121">
          {user.skillIdList
            ?.map((id) => skills.data?.find((skill) => skill.id === id)?.displayName)
            .filter((v) => v)
            .join(', ')}
        </Skills>
      </BottomBlock>
      <LikeButton
        icon={user.isLiked ? 'heartFilled' : 'heart'}
        width={24}
        height={24}
        onClick={onLikeClick}
      />
    </Card>
  );
};
