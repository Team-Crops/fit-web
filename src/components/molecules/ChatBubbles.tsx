import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import _ from 'lodash';
import { useShallow } from 'zustand/react/shallow';

import { Loading } from '#/components/atoms';
import { nullUser } from '#/entities';
import { useChatMessagesQuery } from '#/hooks/use-chat';
import { useAuthStore, useChatStore } from '#/stores';
import { Chat, Message } from '#/types';
import { isImageMessage, isTextMessage } from '#/utilities/message';
import { ChatBubble } from './ChatBubble';

interface ChatBubblesProps {
  chatId: Chat['id'];
}

export const ChatBubbles = ({ chatId }: ChatBubblesProps) => {
  const topRef = useRef<HTMLDivElement>(null);

  const [hasNext, setHasNext] = useState<boolean>(true);
  const [pageCursor, setPageCursor] = useState(0);

  const userId = useAuthStore((store) => store.user?.id);

  const { participants, socket, messages, unshiftMessage, appendMessages } = useChatStore(
    useShallow(({ chats, unshiftMessage, appendMessages }) => ({
      participants: chats[chatId].users,
      socket: chats[chatId].socket,
      messages: chats[chatId].messages,
      unshiftMessage,
      appendMessages,
    }))
  );

  const { data: pages, size, setSize } = useChatMessagesQuery(chatId);

  useEffect(() => {
    socket.on('get_message', (message: Message) => {
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
        isTextMessage(message) ? (
          <ChatBubble
            key={index}
            user={participants.find((p) => p.id === message.userId) ?? nullUser}
            myBubble={message.userId === userId}
            text={message.content}
          />
        ) : isImageMessage(message) ? (
          <Image src={message.imageUrl} alt={`Image from message ${message.id}`} />
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