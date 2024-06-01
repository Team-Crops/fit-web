import { useState } from 'react';

import styled from '@emotion/styled';

import { Icons, Input, Loading } from '#/components/atoms';
import { useMeQuery } from '#/hooks/use-user';
import { useChatStore } from '#/stores';
import { Chat } from '#/types';
import { getStorageUrl } from '#/utilities';
import { RemovableImage } from './RemovableImage';

interface ChatToolboxProps {
  chatId: Chat['id'];
}

export const ChatToolbox = ({ chatId }: ChatToolboxProps) => {
  const [message, setMessage] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([
    'file/profile/default/b45a8562-389b-41bc-b78b-867309a0155bweb.png',
  ]);

  const socket = useChatStore((state) => state.chats[chatId].socket);

  const { data: user } = useMeQuery();

  if (!user) {
    return <Loading />;
  }

  return (
    <Container>
      <ImageContainer>
        {imageUrls.map((url, idx) => (
          <RemovableImage
            key={url}
            src={getStorageUrl(url)}
            alt={`User uploaded image #${idx + 1}`}
            size={100}
            onClickRemove={() => setImageUrls((urls) => urls.filter((u) => url !== u))}
          />
        ))}
      </ImageContainer>
      <Form
        action={() => {
          if (imageUrls.length > 0) {
            imageUrls.map((url) => socket.emit('/chat/image', { content: url }));
            setImageUrls([]);
          }
          if (message) {
            socket.emit('/chat/text', { content: message });
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 20px;
`;

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
