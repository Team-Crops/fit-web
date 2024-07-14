import React, { useCallback, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { Icons, Input, Loading } from '#/components/atoms';
import { useChatId, useChatMessageEmitter } from '#/hooks';
import { usePresignedUrlLazyQuery } from '#/hooks/use-file';
import { useMeQuery } from '#/hooks/use-user';
import { Matching, Project } from '#/types';
import { getStorageUrl, uploadFile } from '#/utilities';
import { RemovableImage } from './RemovableImage';

interface ChatToolboxProps {
  projectId?: Project['id'];
  matchingId?: Matching['id'];
}

export const ChatToolbox = ({ projectId, matchingId }: ChatToolboxProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const { data: user } = useMeQuery();
  const { trigger: getPresignedUrl } = usePresignedUrlLazyQuery();

  const chatId = useChatId({ projectId, matchingId });
  const { emitText, emitImage } = useChatMessageEmitter(chatId);

  const onUploadImage = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      const files = e.target.files;
      if (!files) {
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const { fileKey, preSignedUrl } = await getPresignedUrl({
          fileDomain: 'CHAT',
          fileName: files.item(i)!.name,
        });
        await uploadFile({ preSignedUrl, file: files.item(i)! });
        setImageUrls((urls) => [...urls, fileKey]);
      }
    },
    [getPresignedUrl]
  );

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
        onSubmit={(e) => {
          e.preventDefault();
          if (imageUrls.length > 0) {
            imageUrls.map((url) => emitImage(url));
            setImageUrls([]);
          }
          if (message) {
            emitText(message);
            setMessage('');
          }
        }}
      >
        <input ref={imageInputRef} hidden type="file" accept="image/*" onChange={onUploadImage} />
        <Tool onClick={() => imageInputRef.current?.click()}>
          <Icons icon="image" size={24} />
        </Tool>
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

const Tool = styled.div`
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
