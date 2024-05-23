import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { Loading, Txt } from '#/components/atoms';
import { ChatBubbles } from '#/components/molecules/ChatBubbles';
import { ChatToolbox } from '#/components/molecules/ChatToolbox';
import { useChatMessagesQuery } from '#/hooks/use-chat';
import { useChat } from '#/stores';
import { Message } from '#/types';
import { fitSocket } from '#/utilities/socket';

interface ChatProps {
  chatId: number;
}

export const Chat = ({ chatId }: ChatProps) => {
  const [isTopReached, setIsTopReached] = useState(true);

  const { chat, addNewMessage, addPrevMessages } = useChat(chatId);

  const lastMessage = useMemo(() => chat?.messages[chat.messages.length - 1], [chat?.messages]);

  const { data: messageBundle } = useChatMessagesQuery(
    isTopReached ? chatId : null,
    lastMessage?.id
  );

  const socket = useRef<ReturnType<typeof fitSocket>>();

  const sendMessage = useCallback((message: string) => {
    if (socket.current) {
      socket.current.emit('/chat/text', { content: message });
    }
  }, []);

  const sendImage = useCallback((imageUrl: string) => {
    if (socket.current) {
      socket.current.emit('/chat/image', { content: imageUrl });
    }
  }, []);

  useEffect(() => {
    socket.current = fitSocket({ roomId: chatId });
    socket.current.on('get_message', (message: Message) => {
      addNewMessage(message);
    });
    return () => socket.current.close();
  }, [addNewMessage, chatId]);

  useEffect(() => {
    if (messageBundle) {
      addPrevMessages(messageBundle);
      setIsTopReached(false);
    }
  }, [addPrevMessages, messageBundle]);

  return (
    <Container>
      <Header>
        <Txt size="typo4" weight="bold" color="#757575">
          채팅방
        </Txt>
      </Header>
      {chat ? (
        <ChatBubbles messages={chat?.messages} loadMore={() => setIsTopReached(true)} />
      ) : (
        <Loading />
      )}
      <ChatToolboxContainer>
        <ChatToolbox sendMessage={sendMessage} sendImage={sendImage} />
      </ChatToolboxContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;

  height: 100%;

  background-color: #fafafa;
`;

const Header = styled.div`
  width: 100%;
  padding: 32px 0 20px 28px;

  background-color: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0 32px rgb(0 0 0 / 5%);
`;

const ChatToolboxContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 30px;
`;
