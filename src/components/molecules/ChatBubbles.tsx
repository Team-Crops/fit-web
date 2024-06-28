import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import _ from 'lodash';
import { useShallow } from 'zustand/react/shallow';

import { Loading } from '#/components/atoms';
import { nullUser } from '#/entities';
import { useChatMessagesQuery } from '#/hooks/use-chat';
import { useMeQuery } from '#/hooks/use-user';
import { useChatStore } from '#/stores';
import { Chat } from '#/types';
import { isImageMessage, isNoticeMessage, isTextMessage } from '#/utilities';
import { convertDtoToMessage } from '#/utilities/message';
import { ChatBubble } from './ChatBubble';
import { NoticeBubble } from './NoticeBubble';

interface ChatBubblesProps {
  chatId: Chat['id'];
}

export const ChatBubbles = ({ chatId }: ChatBubblesProps) => {
  const topRef = useRef<HTMLDivElement>(null);

  const [hasNext, setHasNext] = useState<boolean>(true);
  const [pageCursor, setPageCursor] = useState(0);

  const { participants, socket, messages, unshiftMessage, appendMessages } = useChatStore(
    useShallow(({ chats, unshiftMessage, appendMessages }) => ({
      participants: chats[chatId].users,
      socket: chats[chatId].socket,
      messages: chats[chatId].messages,
      unshiftMessage,
      appendMessages,
    }))
  );

  const { data: me } = useMeQuery();

  const { data: pages, size, setSize } = useChatMessagesQuery(chatId);

  useEffect(() => {
    socket.on('get_message', (data: string) => {
      const message = convertDtoToMessage(JSON.parse(data));
      unshiftMessage(chatId, message);
    });
    return () => socket.off('get_message');
  }, [chatId, socket, unshiftMessage]);

  useEffect(() => {
    if (pages && pages.length > pageCursor) {
      const page = pages[pageCursor];
      appendMessages(chatId, page.messages);
      setHasNext(page.hasNext);
      setPageCursor((c) => c + 1);
    }
  }, [appendMessages, chatId, pageCursor, pages, size]);

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
      {messages?.map((message, index) =>
        isNoticeMessage(message) ? (
          <NoticeBubble key={index} message={message} />
        ) : isTextMessage(message) || isImageMessage(message) ? (
          <ChatBubble
            key={index}
            user={participants.find((p) => p.id === message.userId) ?? nullUser}
            message={message}
            myBubble={me?.id === message.userId}
          />
        ) : null
      )}
      {hasNext && <Loading ref={topRef} />}
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
