import { useState } from 'react';

import styled from '@emotion/styled';
import { Temporal } from '@js-temporal/polyfill';

import { Icons, Input, Loading } from '#/components/atoms';
import { useMeQuery } from '#/hooks/use-user';
import { useChatStore } from '#/stores';
import { Chat } from '#/types';

interface ChatToolboxProps {
  chatId: Chat['id'];
}

export const ChatToolbox = ({ chatId }: ChatToolboxProps) => {
  const [message, setMessage] = useState('');

  const { socket, unshiftMessage } = useChatStore(({ chats, unshiftMessage }) => ({
    socket: chats[chatId].socket,
    unshiftMessage,
  }));

  const { data: user } = useMeQuery();

  if (!user) {
    return <Loading />;
  }

  return (
    <Form
      action={() => {
        if (message) {
          socket.emit('/chat/text', { content: message });
          unshiftMessage(chatId, {
            id: -1,
            userId: user.id,
            messageType: 'TEXT',
            createdAt: Temporal.Now.zonedDateTimeISO('Asia/Seoul').toString(),
            content: message,
          });
          setMessage('');
        }
      }}
    >
      <ToolIcon icon="image" size={36} />
      <TextInput
        placeholder="대기방의 팀원에게 메세지를 보내보세요"
        typo="typo5"
        weight="regular"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SendButton type="submit">
        <Icons icon="upload" size={36} color="#ff908d" />
      </SendButton>
    </Form>
  );
};

const Form = styled.form`
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ToolIcon = styled(Icons)`
  cursor: pointer;

  padding: 12px;

  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 50%;

  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TextInput = styled(Input)`
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 1000px;
`;

const SendButton = styled.button`
  cursor: pointer;

  position: absolute;
  right: 16px;

  padding: 0;

  background-color: #fff;
  border-radius: 50%;

  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;
