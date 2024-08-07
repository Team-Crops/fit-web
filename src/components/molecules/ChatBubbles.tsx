import { useEffect, useMemo, useRef } from 'react';

import styled from '@emotion/styled';

import { Loading } from '#/components/atoms';
import { nullUser } from '#/entities';
import {
  useChatId,
  useChatMessagesQuery,
  useChatSubscription,
  useChatUsers,
  useControlMessageHandler,
  useMeQuery,
  useNoticeMessageHandler,
} from '#/hooks';
import { MatchingRoom, Message, Project } from '#/types';
import { isControlMessage, isImageMessage, isNoticeMessage, isTextMessage } from '#/utilities';
import { ChatBubble } from './ChatBubble';
import { NoticeBubble } from './NoticeBubble';

interface ChatBubblesProps {
  projectId?: Project['id'];
  matchingId?: MatchingRoom['id'];
}

export const ChatBubbles = ({ projectId, matchingId }: ChatBubblesProps) => {
  const topRef = useRef<HTMLDivElement>(null);

  const participants = useChatUsers({ projectId, matchingId });
  const chatId = useChatId({ projectId, matchingId });

  const { data: me } = useMeQuery();
  const { data: messages, setSize, append: appendMessage } = useChatMessagesQuery(chatId);

  const handleNoticeMessage = useNoticeMessageHandler(matchingId);
  const handleControlMessage = useControlMessageHandler({ projectId, matchingId });
  const handleMessage = useMemo(
    () => (message: Message) => {
      if (isNoticeMessage(message)) {
        handleNoticeMessage(message);
      }
      if (isControlMessage(message)) {
        handleControlMessage(message);
      }
      appendMessage(message);
    },
    [appendMessage, handleControlMessage, handleNoticeMessage]
  );

  useChatSubscription(chatId, (message) => handleMessage(message));

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
      <Loading ref={topRef} hidden={!messages?.at(-1)?.hasNext} />
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
