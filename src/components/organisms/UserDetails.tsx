import { useCallback, useMemo } from 'react';

import styled from '@emotion/styled';

import { Loading } from '#/components/atoms';
import { IconName, Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { UserProfile } from '#/components/atoms/UserProfile';
import { DataBlock } from '#/components/molecules/TeamRecommend/DataBlock';
import { usePositionsQuery } from '#/hooks/use-positions';
import { useRecommendLikeUserMutation } from '#/hooks/use-recommend';
import { useRegionsQuery } from '#/hooks/use-regions';
import { useSkillsQuery } from '#/hooks/use-skills';
import { useUserQuery } from '#/hooks/use-user';
import { User } from '#/types';
import { getBackgroundStatusText } from '#/utilities/user';

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

  width: 320px;
  margin-bottom: 4px;
`;
const NickName = styled(Txt)`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;
const Position = styled(Txt)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 28px;
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
const RowBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface UserModalProps {
  userId: User['id'];
  onClose: () => void;
}
export const UserDetails = ({ userId, onClose }: UserModalProps) => {
  const { data: user, mutate: mutateCachedUser } = useUserQuery(userId);
  const { data: positions } = usePositionsQuery();
  const { data: skills } = useSkillsQuery();
  const { data: regions } = useRegionsQuery();
  const { trigger: likeUser } = useRecommendLikeUserMutation();

  const positionName = useMemo(
    () => positions?.find((p) => p.id === user?.positionId)?.displayName,
    [positions, user?.positionId]
  );

  const onLikeClick: React.MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      if (user) {
        mutateCachedUser(
          async () => ({
            ...user,
            isLiked: await likeUser({ userId: user.id, like: !user?.isLiked }),
          }),
          { optimisticData: (user) => ({ ...user!, isLiked: !user?.isLiked }) }
        );
      }
    },
    [likeUser, mutateCachedUser, user]
  );

  if (!user) return <Loading />;
  return (
    <Background onClick={onClose}>
      <UserDetailBlock
        onClick={(e) => {
          // e.stopPropagation();
        }}
      >
        <CancelButton icon={'cross'} width={22} height={22} color="#BDBDBD" onClick={onClose} />
        <LikeButton
          icon={user?.isLiked ? 'heartFilled' : 'heart'}
          width={39}
          height={39}
          onClick={onLikeClick}
        />
        <TopBlock>
          <UserProfile size={164} imageUrl={user.profileImageUrl} />
          <SummaryBlock>
            <FlexBlock>
              <NickName size="typo1" weight="bold" color="#212121">
                {user.nickname}
              </NickName>
              <Position size={'typo5'} weight="regular" color="#FF706C">
                {positionName}
              </Position>
            </FlexBlock>
            <Introduction size="typo5" weight="medium" color="#616161">
              {user.introduce}
            </Introduction>
          </SummaryBlock>
        </TopBlock>
        <DataContainer>
          <DataBlock
            title={'사용가능한 기술/툴'}
            content={user.skillIdList?.map(
              (id) => skills?.find((skill) => skill.id === id)?.displayName
            )}
          />
          <DataBlock title={'학력/경력'} content={getBackgroundStatusText(user.backgroundStatus)} />
          <DataBlock title={'학교명'} content={user.backgroundText} />
          <DataBlock
            title={'프로젝트 경험 수'}
            content={
              user.projectCount === 0
                ? '없음'
                : user.projectCount === 3
                  ? `${user.projectCount}회 이상`
                  : `${user.projectCount}회`
            }
          />
          <DataBlock
            title={'주 활동지역'}
            content={regions?.find((v) => v.id === user.regionId)?.displayName}
          />
          <DataBlock title={'활동 가능 시간'} content={(user.activityHour ?? '-') + '시간'} />
          <DataBlock
            title={'포트폴리오'}
            content={
              <>
                <RowBlock>
                  <Icons icon={'clipBold'} width={14} height={14} color="#424242" />
                  {user.portfolioUrl}
                </RowBlock>
                {user.linkList?.map((link) => (
                  <RowBlock key={link.linkUrl}>
                    <Icons
                      icon={link.linkType.toLowerCase() as IconName}
                      width={14}
                      height={14}
                      color="#424242"
                    />
                    {link.linkUrl}
                  </RowBlock>
                ))}
              </>
            }
          />
        </DataContainer>

        <Contact>
          <ContactBlock>
            <Icons icon={'email'} width={20} height={20} />
            <Txt size="typo5" weight="regular" color="#424242">
              {user.email}
            </Txt>
          </ContactBlock>
          <ContactBlock>
            <Icons icon={'phoneFill'} width={20} height={20} />
            <Txt size="typo5" weight="regular" color="#424242">
              {user.phoneNumber}
            </Txt>
          </ContactBlock>
        </Contact>
      </UserDetailBlock>
    </Background>
  );
};
