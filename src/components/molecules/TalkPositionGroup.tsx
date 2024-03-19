import Image from 'next/image';

import styled from '@emotion/styled';

import { User } from '#/entities/user';
import { Txt } from '#atoms/Text';
import { UserProfile } from '#atoms/UserProfile';

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
  align-items: center;
  gap: 18px;
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
              <UserProfile
                imageUrl={user.profileImageUrl}
                nickname={user.nickname}
                width={80}
                height={80}
              />
              <Txt size="typo5" weight="medium">
                {user.nickname}
              </Txt>
            </UserContainer>
          ) : (
            <EmptyUserProfile key={index} />
          )
        )}
      </UsersContainer>
    </Container>
  );
}
