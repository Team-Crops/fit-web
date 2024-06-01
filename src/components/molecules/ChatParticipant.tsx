import styled from '@emotion/styled';

import { Icons, Tooltip, Txt, UserProfile } from '#/components/atoms';
import type { ChatUser } from '#/types';

interface ChatParticipantProps {
  imageUrl: ChatUser['profileImageUrl'];
  nickname: ChatUser['nickname'];
  isEmpty?: boolean;
  isHost?: boolean;
  isReady?: boolean;
}

export const ChatParticipant = ({
  imageUrl,
  nickname,
  isEmpty,
  isHost,
  isReady,
}: ChatParticipantProps) => {
  return (
    <Container>
      {isEmpty ? (
        <EmptyCircle />
      ) : (
        <UserProfileContainer isReady={isReady}>
          <UserProfile imageUrl={imageUrl} nickname={nickname} />
          {isHost && (
            <Tooltip text="랜덤설정된 임시방장입니다.">
              <HostIcon icon="crown" size={28} />
            </Tooltip>
          )}
          {isReady && (
            <Tooltip text="프로젝트에 참여 완료한 팀원입니다.">
              <ReadyIcon icon="check" size={16} color="#fff" />
            </Tooltip>
          )}
        </UserProfileContainer>
      )}
      <Nickname size="typo5" weight="medium" color="rgba(33, 33, 33, 1)">
        {nickname ?? ''}
      </Nickname>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 78px;
`;

const EmptyCircle = styled.div`
  box-sizing: border-box;
  width: 76px;
  height: 76px;

  background: none;
  border: 1px dotted #ff706c;
  border-radius: 100px;
`;

const UserProfileContainer = styled.div<{ isReady?: boolean }>`
  position: relative;

  width: fit-content;

  background-color: rgb(255 167 165 / 100%);
  border-radius: 100%;
  box-shadow: ${({ isReady }) => (isReady ? '0 0 0 3px #ff706c inset' : 'none')};
`;

const HostIcon = styled(Icons)`
  position: absolute;
  right: -4px;
  bottom: -4px;
`;

const ReadyIcon = styled(Icons)`
  position: absolute;
  top: -4px;
  right: -4px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  padding: 4px;

  background-color: #ff706c;
  border-radius: 100px;
`;

const Nickname = styled(Txt)`
  text-align: center;
`;
