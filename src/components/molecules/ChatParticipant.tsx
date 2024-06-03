import { useState } from 'react';

import styled from '@emotion/styled';

import { Button, Icons, MouseDetector, Tooltip, Txt, UserProfile } from '#/components/atoms';
import { UserDetails } from '#/components/organisms/UserDetails';
import type { ReportUserMutationArg } from '#/hooks/use-projects';
import type { ChatUser } from '#/types';
import { ReportPopup } from './ReportPopup';

interface ChatParticipantProps {
  imageUrl: ChatUser['profileImageUrl'];
  nickname: ChatUser['nickname'];
  userId?: ChatUser['id'];
  isEmpty?: boolean;
  isHost?: boolean;
  isReady?: boolean;
  onReportUser?: (args: Omit<ReportUserMutationArg, 'targetUserId'>) => Promise<void>;
  onKickUser?: () => void;
}

export const ChatParticipant = ({
  imageUrl,
  nickname,
  userId,
  isEmpty,
  isHost,
  isReady,
  onReportUser,
  onKickUser,
}: ChatParticipantProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);

  return (
    <Container>
      {isEmpty ? (
        <EmptyCircle />
      ) : (
        <UserProfileContainer isReady={isReady} onClick={() => setShowDetails((v) => !v)}>
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
      {userId && showDetails && (
        <UserDetailsPopup onClickOutside={() => setShowDetails(false)}>
          <UserDetails userId={userId} />
          <Toolbox>
            {onReportUser && (
              <Button
                variant={'angular'}
                height={'20'}
                color="primary"
                onClick={() => {
                  setShowDetails(false);
                  setShowReportPopup(true);
                }}
              >
                신고하기
              </Button>
            )}
            {onKickUser && (
              <Button variant={'angular'} height={'20'} color="primary" onClick={onKickUser}>
                강퇴하기
              </Button>
            )}
          </Toolbox>
        </UserDetailsPopup>
      )}
      {onReportUser && showReportPopup && (
        <ReportPopup onClose={() => setShowReportPopup(false)} onReport={onReportUser} />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;

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
  cursor: pointer;

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
  top: -28px;
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

const UserDetailsPopup = styled(MouseDetector)`
  position: absolute;
  z-index: 100;
  top: 0;
  left: calc(100% + 16px);

  padding-bottom: 40px;

  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 0 40px 0 rgb(0 0 0 / 10%);
`;

const Toolbox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  display: flex;
  gap: 10px;
`;
