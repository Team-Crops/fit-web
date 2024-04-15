'use client';

import styled from '@emotion/styled';

import { useSignInStore } from '#/stores/sign-in';
import { Button } from '#atoms/Button';
import { Icons } from '#atoms/Icons';

const LoginButton = styled(Button)`
  display: flex;
  gap: 12px;
  align-items: center;

  padding: 0 23px;

  font-family: SpoqaHanSansNeo, sans-serif;
  font-size: 18px;
  font-weight: 400;
`;
export const HeaderLoginBlock = () => {
  const openPopup = useSignInStore((state) => state.openPopup);

  return (
    <div>
      <LoginButton variant={'round'} height={'50'} color={'primary'} onClick={() => openPopup()}>
        <Icons icon={'user'} width={24} height={20} />
        로그인
      </LoginButton>
    </div>
  );
};
