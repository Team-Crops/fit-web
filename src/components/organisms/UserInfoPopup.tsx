'use client';

import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { useLazyGetUploadSignedUrlQuery } from '#/redux/features/file/api';
import { useMeQuery, useUpdateMeMutation } from '#/redux/features/user/api';
import { useAppSelector } from '#/redux/hooks';
import { Button } from '#atoms/Button';
import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  background-color: #fff;
  width: 830px;
  height: 680px;

  border-radius: 15px;
  padding: 20px;
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 164px;
  height: 164px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;

  color: #bdbdbd;
  cursor: pointer;

  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0px 0px 164px rgba(0, 0, 0, 0.1);
  }

  overflow: hidden;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
`;

const StyledInput = styled.input`
  width: 400px;
  border: none;
  border-bottom: 3px solid #ff908d;
  padding: 10px;

  &::placeholder {
    color: #bdbdbd;
  }
`;

export const UserInfoPopup = () => {
  const me = useAppSelector((state) => state.auth.user);
  const [updateMe] = useUpdateMeMutation();
  const [getSignedUrl, { data: signedUrl }] = useLazyGetUploadSignedUrlQuery();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [nickname, setNickname] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [enableContinue, setEnableContinue] = useState(false);

  useEffect(() => {
    if (me) {
      setNickname(me.nickname || '');
    }
  }, [me]);

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const image = e.target.files?.item(0);
    if (image) {
      setPreviewImage(URL.createObjectURL(image));
    } else {
      setPreviewImage(null);
    }
  };

  useEffect(() => {
    setEnableContinue(nickname.length > 0);
  }, [imageInputRef, nickname]);

  useEffect(() => {
    if (signedUrl) {
      const image = imageInputRef.current?.files?.item(0);
      if (!image) {
        return;
      }
      const formData = new FormData();
      formData.append('file', image);
      fetch(signedUrl.preSignedUrl, {
        method: 'PUT',
        body: image,
      }).then(() => {
        updateMe({ ...me, nickname, profileImageUrl: signedUrl.fileKey });
      });
    }
  });

  return (
    <Container>
      <Txt size="typo1" weight="bold">
        프로필 사진과 닉네임을 설정해주세요!
      </Txt>
      <ProfileImage onClick={() => imageInputRef.current?.click()}>
        {previewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewImage} alt="Profile Image" width="164" height="164" />
        ) : (
          <>
            <Icons icon="camera" width={48} height={48} />
            <Txt size="typo4" weight="medium">
              이미지 추가
            </Txt>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
          ref={imageInputRef}
        />
      </ProfileImage>
      <NicknameContainer>
        <StyledInput
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Txt style={{ color: '#9e9e9e' }} size="typo5" weight="regular">
          필수항목입니다
        </Txt>
      </NicknameContainer>
      <Button
        color="primary"
        height="70"
        variant="round"
        disabled={!enableContinue}
        onClick={() => {
          const image = imageInputRef.current?.files?.item(0);
          if (!image) {
            return;
          }
          getSignedUrl({
            fileDomain: 'PROFILE_IMAGE',
            fileName: image.name,
          });
        }}
      >
        시작하기
      </Button>
    </Container>
  );
};
