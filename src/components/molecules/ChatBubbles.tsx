import { forwardRef, useEffect, useRef } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import { exampleUsers } from '#/entities';
import { Message } from '#/types';
import { isImageMessage, isTextMessage } from '#/utilities/message';
import { ChatBubble } from './ChatBubble';

interface ChatBubblesProps {
  messages: Message[];
  loadMore: () => void;
}

export const ChatBubbles = ({ messages, loadMore }: ChatBubblesProps) => {
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (topRef.current) {
      observer.observe(topRef.current);
    }
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <Container>
      <div />
      <div />
      <div />
      {messages.map((message, index) =>
        isTextMessage(message) ? (
          <ChatBubble key={index} user={exampleUsers[0]} text={message.content} />
        ) : isImageMessage(message) ? (
          <Image src={message.imageUrl} alt={`Image from message ${message.id}`} />
        ) : null
      )}
      <div ref={topRef} />
    </Container>
  );
};

ChatBubbles.displayName = 'ChatBubbles';

const Container = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  gap: 40px;

  height: 100%;
  padding: 28px;
`;
