import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { Loading } from '#/components/atoms';
import { nullUser } from '#/entities';
import {
  useChatId,
  useChatUsers,
  useChatMessagesQuery,
  useChatSubscription,
  useMeQuery,
} from '#/hooks';
import { useControlMessageHandler } from '#/hooks/use-control-message-handler';
import { useNoticeMessageHandler } from '#/hooks/use-notice-message-handler';
import { MatchingRoom, Project } from '#/types';
import { isControlMessage, isImageMessage, isNoticeMessage, isTextMessage } from '#/utilities';
import { ChatBubble } from './ChatBubble';
import { NoticeBubble } from './NoticeBubble';

interface ChatBubblesProps {
  projectId?: Project['id'];
  matchingId?: MatchingRoom['id'];
}

export const ChatBubbles = ({ projectId, matchingId }: ChatBubblesProps) => {
  const topRef = useRef<HTMLDivElement>(null);

  const noticeMessageHandler = useNoticeMessageHandler(matchingId);
  const controlMessageHandler = useControlMessageHandler({ projectId, matchingId });

  const participants = useChatUsers({ projectId, matchingId });
  const chatId = useChatId({ projectId, matchingId });

  const { data: me } = useMeQuery();
  const { data: messages, setSize, append: appendMessage } = useChatMessagesQuery(chatId);
  const { data: recentMessage } = useChatSubscription(chatId);

  useEffect(() => {
    if (recentMessage) {
      if (isNoticeMessage(recentMessage)) {
        noticeMessageHandler(recentMessage);
      }
      if (isControlMessage(recentMessage)) {
        controlMessageHandler(recentMessage);
      }
      appendMessage(recentMessage);
    }
  }, [appendMessage, controlMessageHandler, noticeMessageHandler, recentMessage]);

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
