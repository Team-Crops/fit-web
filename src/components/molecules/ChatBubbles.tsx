import { useState } from 'react';

import styled from '@emotion/styled';

import { exampleUsers } from '#/entities';
import { ChatBubble } from './ChatBubble';

export const ChatBubbles: React.FC = () => {
  const [messages, setMessages] = useState<string[]>(['Hi']);

  return (
    <Container>
      {messages.map((message, index) => (
        <ChatBubble key={index} user={exampleUsers[0]} text={message} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 28px;
`;
