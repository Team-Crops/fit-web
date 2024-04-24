import styled from '@emotion/styled';

import { User } from '#/types/user';
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

  background: #ffeae9;
  border-radius: 5px;
`;

const UsersContainer = styled.ul`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: flex-start;

  margin: 0;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
`;

const EmptyUserProfile = styled.div`
  flex-shrink: 0;

  box-sizing: border-box;
  width: 80px;
  height: 80px;

  border: 1px dashed #ff706c;
  border-radius: 50%;
`;

interface TalkGroupProps {
  groupName: string;
  users: (User | null)[];
}

export const TalkPositionGroup = ({ groupName, users }: TalkGroupProps) => {
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
              <UserProfile imageUrl={user.profileImageUrl} nickname={user.nickname} size={80} />
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
};
