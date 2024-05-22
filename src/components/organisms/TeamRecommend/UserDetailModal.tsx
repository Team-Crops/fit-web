import { Fragment, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { lowerCase, upperCase } from 'lodash';

import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { UserProfile } from '#/components/atoms/UserProfile';
import { DataBlock } from '#/components/molecules/TeamRecommend/DataBlock';
import { usePositionsQuery } from '#/hooks/use-positions';
import { useRecommendLikeUserQuery } from '#/hooks/use-recommend';
import { useRegionsQuery } from '#/hooks/use-regions';
import { useSkillsQuery } from '#/hooks/use-skills';
import { UserIdResponse, useUserUserIdQuery } from '#/hooks/use-user';
import { careerTextToValue } from '#/utilities/career-text-value-match';

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

interface UserDetailModalProps {
  userId: number;
  isClose: () => void;
}
export const UserDetailModal = ({ userId, isClose }: UserDetailModalProps) => {
  const [userData, setUserData] = useState<UserIdResponse | undefined>(undefined);
  console.log(userData);
  const { data: positions } = usePositionsQuery();
  const { data: skills } = useSkillsQuery();
  const { data: regions } = useRegionsQuery();
  const { trigger: likeTrigger } = useRecommendLikeUserQuery();
  const { mutate: getUserData } = useUserUserIdQuery(userId);
  const positionName = useMemo(() => {
    const position = positions?.find((v) => v.id === userData?.userProfile.positionId);
    return position?.displayName;
  }, [positions, userData?.userProfile.positionId]);

  const onClickLike: MouseEventHandler = useCallback(
    (e) => {
      likeTrigger({
        userId: userData?.userProfile.id ?? 0,
        like: !userData?.isLiked,
      });
      setUserData((prev) => {
        if (prev === undefined) return prev;
        return {
          ...prev,
          isLiked: !prev.isLiked,
        };
      });
    },
    [likeTrigger, userData?.isLiked, userData?.userProfile.id]
  );

  useEffect(() => {
    async function fetchData() {
      const data = await getUserData();
      setUserData(data);
    }
    fetchData();
  }, [getUserData]);

  if (userData === undefined) return null;
  return (
    <Background onClick={isClose}>
      <UserDetailBlock
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CancelButton icon={'cross'} width={22} height={22} color="#BDBDBD" onClick={isClose} />
        <LikeButton
          icon={userData?.isLiked ? 'heartFill' : 'heart'}
          width={39}
          height={39}
          onClick={onClickLike}
        />
        <TopBlock>
          <UserProfile size={164} imageUrl={userData.userProfile.profileImageUrl} />
          <SummaryBlock>
            <FlexBlock>
              <NickName size="typo1" weight="bold" color="#212121">
                {userData.userProfile.nickname}
              </NickName>
              <Position size={'typo5'} weight="regular" color="#FF706C">
                {positionName}
              </Position>
            </FlexBlock>
            <Introduction size="typo5" weight="medium" color="#616161">
              {userData.userProfile.introduce}
            </Introduction>
          </SummaryBlock>
        </TopBlock>
        <DataContainer>
          <DataBlock
            title={'사용가능한 기술/툴'}
            content={userData.userProfile.skillIdList?.map((skillId, index) => {
              const skill = skills?.find((skill) => skill.id === skillId);
              return (
                <Fragment key={skillId}>
                  {skill?.displayName}
                  {index !== (userData.userProfile.skillIdList ?? []).length - 1 && ', '}
                </Fragment>
              );
            })}
          />
          <DataBlock
            title={'학력/경력'}
            content={careerTextToValue(userData.userProfile.backgroundStatus)}
          />
          <DataBlock title={'학교명'} content={userData.userProfile.education} />
          <DataBlock
            title={'프로젝트 경험 수'}
            content={
              userData.userProfile.projectCount === 0
                ? '없음'
                : userData.userProfile.projectCount === 3
                  ? `${userData.userProfile.projectCount}회 이상`
                  : `${userData.userProfile.projectCount}회`
            }
          />
          <DataBlock
            title={'주 활동지역'}
            content={regions?.find((v) => v.id === userData.userProfile.regionId)?.displayName}
          />
          <DataBlock
            title={'활동 가능 시간'}
            content={(userData.userProfile.activityHour ?? '-') + '시간'}
          />
          <DataBlock
            title={'포트폴리오'}
            content={
              <>
                <RowBlock>
                  <Icons icon={'clipBold'} width={14} height={14} color="#424242" />
                  {userData.userProfile.portfolioUrl}
                </RowBlock>
                {userData.userProfile.linkList?.map((link) => (
                  <RowBlock key={link.linkUrl}>
                    {/* @ts-expect-error */}
                    <Icons icon={lowerCase(link.linkType)} width={14} height={14} color="#424242" />
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
              {userData.userProfile.email}
            </Txt>
          </ContactBlock>
          <ContactBlock>
            <Icons icon={'phoneFill'} width={20} height={20} />
            <Txt size="typo5" weight="regular" color="#424242">
              {userData.userProfile.phoneNumber}
            </Txt>
          </ContactBlock>
        </Contact>
      </UserDetailBlock>
    </Background>
  );
};
