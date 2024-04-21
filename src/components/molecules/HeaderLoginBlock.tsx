'use client';

import { useState } from 'react';

import styled from '@emotion/styled';

import { Button } from '#atoms/Button';
import { Icons } from '#atoms/Icons';
import { LoginPopup } from '#templates/LoginPopup';

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
  const [isOpenedLoginPopup, setIsOpenedLoginPopup] = useState(false);
  return (
    <div>
      <LoginButton
        variant={'round'}
        height={'50'}
        color={'primary'}
        onClick={() => setIsOpenedLoginPopup(true)}
      >
        <Icons icon={'user'} width={24} height={20} />
        로그인
      </LoginButton>
      {isOpenedLoginPopup && <LoginPopup onCancel={() => setIsOpenedLoginPopup(false)} />}
    </div>
  );
};
