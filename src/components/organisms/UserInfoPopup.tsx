'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { usePresignedProfileImageUploadUrlMutation } from '#/redux/features/file/api';
import { useUpdateMeMutation } from '#/redux/features/user/api';
import { useAppDispatch } from '#/redux/hooks';
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

const HelperText = styled(Txt)`
  color: #9e9e9e;
`;

export const UserInfoPopup = () => {
  const [updateMe, { data, isLoading }] = useUpdateMeMutation();
  const [getUploadUrl, { data: uploadInfo }] = usePresignedProfileImageUploadUrlMutation();

  const dispatch = useAppDispatch();

  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const onProfileImageClick = () => {
    profileImageInputRef.current?.click();
  };
  const onProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    console.log(file);
  };
  const onSubmitClick = () => {};

  return (
    <Container>
      <Txt size="typo1" weight="bold">
        프로필 사진과 닉네임을 설정해주세요!
      </Txt>
      <ProfileImage onClick={onProfileImageClick}>
        <Icons icon="camera" width={48} height={48} />
        <Txt size="typo4" weight="medium">
          이미지 추가
        </Txt>
        <input
          type="file"
          accept="image/*"
          onChange={onProfileImageChange}
          hidden
          ref={profileImageInputRef}
        />
      </ProfileImage>
      <NicknameContainer>
        <StyledInput placeholder="닉네임" ref={nicknameInputRef} />
        <HelperText size="typo5" weight="regular">
          필수항목입니다
        </HelperText>
      </NicknameContainer>
      <Button color="primary" height="70" variant="round" onClick={onSubmitClick}>
        시작하기
      </Button>
    </Container>
  );
};
