import { useCallback, useMemo } from 'react';

import styled from '@emotion/styled';

import { Loading } from '#/components/atoms';
import { IconName, Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { DataBlock } from '#/components/molecules/TeamRecommend/DataBlock';
import { usePositionsQuery } from '#/hooks/use-positions';
import { useRecommendLikeUserMutation } from '#/hooks/use-recommend';
import { useRegionsQuery } from '#/hooks/use-regions';
import { useSkillsQuery } from '#/hooks/use-skills';
import { useUserQuery } from '#/hooks/use-user';
import { Link, User } from '#/types';
import { LinkType } from '#/types/link';
import { getIconByLinkType } from '#/utilities/icon';
import { getBackgroundStatusText } from '#/utilities/user';
import { ProfileCard } from '../molecules/ProfileCard';

const TopBlock = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 100px 60px 30px;
`;
const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: calc(100% - 78px);
  padding: 28px;

  background-color: #f5f5f5;
  border-radius: 6px;
`;
const ContactContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  padding: 40px;
`;
const ContactBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const RowBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface UserModalProps {
  userId: User['id'];
  showIsLiked?: boolean;
  showContacts?: boolean;
}

export const UserDetails = ({ userId, showIsLiked, showContacts }: UserModalProps) => {
  const { data: user, mutate: mutateCachedUser } = useUserQuery(userId);
  const { data: skills } = useSkillsQuery();
  const { data: regions } = useRegionsQuery();
  const { trigger: likeUser } = useRecommendLikeUserMutation();

  const details: { name: string; value: string | Link[] }[] = useMemo(
    () => [
      { name: '학력/경력', value: getBackgroundStatusText(user?.backgroundStatus) ?? '-' },
      { name: '학교명', value: user?.backgroundText ?? '-' },
      {
        name: '사용가능한 기술/툴',
        value:
          skills
            ?.filter((s) => user?.skillIdList?.some((sid) => s.id === sid))
            .map((s) => s.displayName)
            .join(', ') ?? '-',
      },
      { name: '프로젝트 경험 수', value: user?.projectCount ? `${user?.projectCount}번` : '없음' },
      {
        name: '주 활동지역',
        value: regions?.find((r) => r.id === user?.regionId)?.displayName ?? '-',
      },
      { name: '활동 가능 시간', value: `${user?.activityHour ?? '-'}시간` },
      {
        name: '포트폴리오',
        value: [
          ...(user?.portfolioUrl
            ? [{ linkType: 'LINK' as LinkType, linkUrl: user?.portfolioUrl ?? '' }]
            : []),
          ...(user?.linkList ?? []),
        ],
      },
    ],
    [
      regions,
      skills,
      user?.activityHour,
      user?.backgroundStatus,
      user?.backgroundText,
      user?.linkList,
      user?.portfolioUrl,
      user?.projectCount,
      user?.regionId,
      user?.skillIdList,
    ]
  );

  console.dir(details);

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

  if (!user) {
    return <Loading />;
  }
  return (
    <Container>
      {showIsLiked && (
        <LikeButton
          icon={user?.isLiked ? 'heartFilled' : 'heart'}
          size={40}
          onClick={onLikeClick}
        />
      )}

      <TopBlock>
        <ProfileCard user={user} size="large" />
      </TopBlock>
      <DataContainer>
        {details.map((detail) => {
          if (Array.isArray(detail.value)) {
            return (
              <DataBlock
                key={detail.name}
                title={detail.name}
                content={detail.value.map((link) => (
                  <RowBlock key={link.linkUrl}>
                    <Icons icon={getIconByLinkType(link.linkType)} size={14} color="#424242" />
                    <Txt size="typo5" weight="regular">
                      {link.linkUrl}
                    </Txt>
                  </RowBlock>
                ))}
              />
            );
          }
          return <DataBlock key={detail.name} title={detail.name} content={detail.value} />;
        })}
      </DataContainer>
      {showContacts && (
        <ContactContainer>
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
        </ContactContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 630px;

  background-color: #fff;
  border-radius: 10px;
`;

const LikeButton = styled(Icons)`
  cursor: pointer;
  position: absolute;
  top: 28px;
  right: 31px;
`;
