import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import { useUser } from '#/hooks/use-user';
import { useSignUpStore } from '#/stores/sign-up';
import { SignUpStep } from '#/types/sign-up-step';
import { uploadProfileImage } from '#/utilities/upload-storage';
import { Button } from '../atoms/Button';
import { Icons } from '../atoms/Icons';
import { Input } from '../atoms/Input';
import { Txt } from '../atoms/Text';

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

export const SignUpProfileCreationPopup = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>();

  const { data: user, mutate: mutateUser, isLoading } = useUser();

  const setStep = useSignUpStore((state) => state.setStep);

  const goForwardStep = useCallback(() => setStep(SignUpStep.ProfileCreation + 1), [setStep]);

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
    const image = imageInputRef.current?.files?.item(0);
    if (!image) {
      await mutateUser({ nickname });
      return goForwardStep();
    } else {
      const { fileKey } = await uploadProfileImage(image);
      await mutateUser({ nickname, profileImageUrl: fileKey });
      return goForwardStep();
    }
  }, [goForwardStep, mutateUser, nickname]);

  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNickname(user?.nickname ?? '');
  }, [user]);

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
        disabled={isLoading}
        onClick={() => handleSubmit()}
      >
        시작하기
      </Button>
    </Container>
  );
};
