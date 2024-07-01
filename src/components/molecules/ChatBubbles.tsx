import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import { Loading } from '#/components/atoms';
import { nullUser } from '#/entities';
import {
  useChatId,
  useChatUsers,
  useChatMessagesQuery,
  useChatSubscription,
  useMeQuery,
  useMatchingRoomQuery,
  useProjectsQuery,
  useMatchingQuery,
} from '#/hooks';
import { MatchingRoom, Project } from '#/types';
import { isImageMessage, isNoticeMessage, isTextMessage } from '#/utilities';
import { ChatBubble } from './ChatBubble';
import { NoticeBubble } from './NoticeBubble';

interface ChatBubblesProps {
  projectId?: Project['id'];
  matchingId?: MatchingRoom['id'];
}

export const ChatBubbles = ({ projectId, matchingId }: ChatBubblesProps) => {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);

  const { mutate: mutateCachedMatching } = useMatchingQuery();
  const { mutate: mutateCachedRoom } = useMatchingRoomQuery(matchingId);
  const { mutate: mutateCachedProjects } = useProjectsQuery();

  const participants = useChatUsers({ projectId, matchingId });
  const chatId = useChatId({ projectId, matchingId });

  const { data: me } = useMeQuery();
  const { data: messages, setSize, append: appendMessage } = useChatMessagesQuery(chatId);
  const { data: recentMessage } = useChatSubscription(chatId);

  useEffect(() => {
    if (recentMessage) {
      if (isNoticeMessage(recentMessage)) {
        mutateCachedRoom();
        if (recentMessage.type === 'COMPLETE' && matchingId) {
          mutateCachedMatching();
          router.replace(`/projects/${recentMessage.notice}`);
        }
        if (recentMessage.type === 'COMPLETE' && projectId) {
          mutateCachedProjects();
        }
      }
      appendMessage(recentMessage);
    }
  }, [
    appendMessage,
    matchingId,
    mutateCachedMatching,
    mutateCachedProjects,
    mutateCachedRoom,
    projectId,
    recentMessage,
    router,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setSize((s) => s + 1);
      }
    });
    if (topRef.current) {
      observer.observe(topRef.current);
    }
    return () => observer.disconnect();
  }, [setSize]);

  return (
    <Container>
      <div />
      <div />
      <div />
      {messages
        ?.flatMap((m) => m.messages)
        ?.map((message) =>
          isNoticeMessage(message) ? (
            <NoticeBubble key={message.id} message={message} />
          ) : isTextMessage(message) || isImageMessage(message) ? (
            <ChatBubble
              key={message.id}
              user={participants.find((p) => p.id === message.userId) ?? nullUser}
              message={message}
              myBubble={me?.id === message.userId}
            />
          ) : null
        )}
      {messages?.at(-1)?.hasNext && <Loading ref={topRef} />}
    </Container>
  );
};

const Container = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  gap: 40px;

  height: 100%;
  padding: 28px;
`;
