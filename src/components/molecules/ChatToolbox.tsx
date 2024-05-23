import { useState } from 'react';

import styled from '@emotion/styled';

import { Icons, Input } from '#/components/atoms';

interface ChatToolboxProps {
  sendMessage: (message: string) => void;
  sendImage: (imageUrl: string) => void;
}

export const ChatToolbox = ({ sendMessage, sendImage }: ChatToolboxProps) => {
  const [message, setMessage] = useState('');
  return (
    <Form
      action={(e) => {
        sendMessage(message);
        setMessage('');
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
