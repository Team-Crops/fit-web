'use client';

import styled from '@emotion/styled';

import { useLoginGuardStore } from '#/stores';
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
  const showLoginPopup = useLoginGuardStore((state) => state.showLoginPopup);
  return (
    <div>
      <LoginButton
        variant={'round'}
        height={'50'}
        color={'primary'}
        onClick={() => showLoginPopup()}
      >
        <Icons icon={'user'} width={24} height={20} />
        로그인
      </LoginButton>
    </div>
  );
};
