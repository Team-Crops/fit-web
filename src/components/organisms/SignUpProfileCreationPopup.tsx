import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import { useShallow } from 'zustand/react/shallow';

import { Button, Icons, Input, Txt } from '#/components/atoms';
import { usePresignedUrlQuery } from '#/hooks/use-presigned-url';
import { useMeMutation, useMeQuery } from '#/hooks/use-user';
import { User } from '#/types';
import { getStorageUrl, uploadFile } from '#/utilities/storage';

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: min(100%, 830px);
  height: 700px;

  background-color: #fff;
  border-radius: 15px;
`;

const ProfileImage = styled.div`
  cursor: pointer;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;

  width: 164px;
  height: 164px;

  color: #bdbdbd;

  border: 1px solid #e0e0e0;
  border-radius: 50%;

  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 164px rgb(0 0 0 / 10%);
  }
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: end;

  width: min(100%, 420px);
`;

interface SignUpProfileCreationPopupProps {
  onSuccess: () => void;
}

export const SignUpProfileCreationPopup: React.FC<SignUpProfileCreationPopupProps> = ({
  onSuccess,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [canSubmit, setCanSubmit] = useState(false);

  const { data: me, mutate: mutateCachedMe } = useMeQuery();

  const { trigger: mutateUser, isMutating: isMutatingUser } = useMeMutation();
  const { trigger: getPresignedUrl } = usePresignedUrlQuery();

  const handleImageChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const image = e.target.files?.item(0);
      if (!image) {
        setPreviewImage(null);
      } else {
        setPreviewImage(URL.createObjectURL(image));
      }
    },
    [setPreviewImage]
  );

  const handleSubmit = useCallback(async () => {
    const imageFile = imageInputRef.current?.files?.item(0);
    const userInfo: Partial<User> = { nickname };
    if (imageFile) {
      const { preSignedUrl, fileKey } = await getPresignedUrl({
        fileDomain: 'PROFILE_IMAGE',
        fileName: imageFile.name,
      });
      await uploadFile({ preSignedUrl, file: imageFile });
      userInfo.profileImageUrl = fileKey;
    }
    mutateCachedMe(await mutateUser(userInfo));
    return onSuccess();
  }, [getPresignedUrl, mutateCachedMe, mutateUser, nickname, onSuccess]);

  useEffect(() => {
    setPreviewImage(getStorageUrl(me?.profileImageUrl));
  }, [me?.profileImageUrl]);

  useEffect(() => {
    setNickname(me?.nickname ?? '');
  }, [me?.nickname]);

  useEffect(() => {
    setCanSubmit(!!nickname);
  }, [nickname]);

  return (
    <Container>
      <div />
      <Txt size="typo1" weight="bold">
        프로필 사진과 닉네임을 설정해주세요!
      </Txt>
      <div />
      <ProfileImage onClick={() => imageInputRef.current?.click()}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
          ref={imageInputRef}
        />
        {previewImage ? (
          <Image src={previewImage} alt="프로필 이미지 미리보기" width="164" height="164" />
        ) : (
          <>
            <Icons icon="camera" width={48} height={48} />
            <Txt size="typo4" weight="medium" color="#bdbdbd">
              이미지 추가
            </Txt>
          </>
        )}
      </ProfileImage>
      <NicknameContainer>
        <Input
          variant="standard"
          placeholder="닉네임"
          typo="typo3"
          weight="medium"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Txt color="#9e9e9e" size="typo5" weight="regular">
          필수항목입니다
        </Txt>
      </NicknameContainer>
      <Button
        color="primary"
        height="70"
        variant="round"
        disabled={isMutatingUser || !canSubmit}
        onClick={() => handleSubmit()}
      >
        시작하기
      </Button>
    </Container>
  );
};
