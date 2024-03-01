'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import { AuthStep, updateAuth } from '#/redux/features/auth/slice';
import { useLazyGetUploadSignedUrlQuery } from '#/redux/features/file/api';
import { useUpdateMeMutation } from '#/redux/features/user/api';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
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
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.auth.user);
  const [updateMe] = useUpdateMeMutation();
  const [getUploadUrl] = useLazyGetUploadSignedUrlQuery();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string>();
  const [nickname, setNickname] = useState<string | undefined>(me?.nickname);

  const goForwardStep = useCallback(() => {
    dispatch(updateAuth({ step: AuthStep.UserInfo + 1 }));
  }, [dispatch]);

  const uploadImage = useCallback(
    async (image: File) => {
      setIsUploadingImage(true);
      const uploadUrl = await getUploadUrl({ fileDomain: 'PROFILE_IMAGE', fileName: image.name });
      if (uploadUrl.error || !uploadUrl.data) {
        throw new Error('Failed to get upload url');
      }

      const { fileKey, preSignedUrl } = uploadUrl.data;
      const formData = new FormData();
      formData.append('file', image);
      const response = await fetch(preSignedUrl, {
        method: 'PUT',
        body: image,
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      setIsUploadingImage(false);

      return fileKey;
    },
    [getUploadUrl]
  );

  const handleImageChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const image = e.target.files?.item(0);
      if (image) {
        setPreviewImage(URL.createObjectURL(image));
      } else {
        setPreviewImage(undefined);
      }
    },
    [setPreviewImage]
  );

  const handleStartClick = useCallback(async () => {
    if (!me && isUploadingImage) {
      return;
    }

    const image = imageInputRef.current?.files?.item(0);
    if (image) {
      const profileImageUrl = await uploadImage(image);
      await updateMe({ profileImageUrl });
      return goForwardStep();
    } else {
      return goForwardStep();
    }
  }, [goForwardStep, isUploadingImage, me, updateMe, uploadImage]);

  return (
    <Container>
      <Txt size="typo1" weight="bold">
        프로필 사진과 닉네임을 설정해주세요!
      </Txt>
      <ProfileImage onClick={() => imageInputRef.current?.click()}>
        {previewImage ? (
          <Image src={previewImage} alt="Profile Image" width="164" height="164" />
        ) : (
          <>
            <Icons icon="camera" width={48} height={48} />
            <Txt size="typo4" weight="medium" color="#bdbdbd">
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
          onBlur={(e) =>
            e.target.value ? updateMe({ nickname: e.target.value }) : setNickname(me?.nickname)
          }
        />
        <Txt style={{ color: '#9e9e9e' }} size="typo5" weight="regular">
          필수항목입니다
        </Txt>
      </NicknameContainer>
      <Button
        color="primary"
        height="70"
        variant="round"
        disabled={isUploadingImage || !me?.nickname}
        onClick={handleStartClick}
      >
        시작하기
      </Button>
    </Container>
  );
};
