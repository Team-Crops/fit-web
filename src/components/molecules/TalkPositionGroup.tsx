import Image from 'next/image';

import styled from '@emotion/styled';

import { User } from '#/entities/user';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';

const Container = styled.div`
  display: flex;
`;

const GroupNameContainer = styled.div`
  flex: 1;
  max-width: 136px;
`;

const GroupName = styled(Txt)`
  width: fit-content;
  height: fit-content;
  padding: 12px 23px;

  border-radius: 5px;
  background: #ffeae9;
`;

const UsersContainer = styled.ul`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 50px;
  margin: 0;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EmptyUserProfile = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;

  border: 1px dashed #ff706c;
  border-radius: 50%;
  box-sizing: border-box;
`;

interface TalkGroupProps {
  groupName: string;
  users: (User | null)[];
}

export function TalkPositionGroup({ groupName, users }: TalkGroupProps) {
  const profileSize = { width: 80, height: 80 };
  return (
    <Container>
      <GroupNameContainer>
        <GroupName size="typo5" weight="medium">
          {groupName}
        </GroupName>
      </GroupNameContainer>
      <UsersContainer>
        {users.map((user, index) =>
          user ? (
            <UserContainer key={user.id}>
              {user.profileImageUrl ? (
                <Image
                  src={user.profileImageUrl}
                  alt={`${user.nickname}'s profile image`}
                  {...profileSize}
                />
              ) : (
                <Icons icon="account" {...profileSize} />
              )}
            </UserContainer>
          ) : (
            <EmptyUserProfile key={index} />
          )
        )}
      </UsersContainer>
    </Container>
  );
}
