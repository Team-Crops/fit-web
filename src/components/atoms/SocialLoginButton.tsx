'use client';

import { useEffect } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LoginServer } from 'src/entities/loginServer';
import { useLazyLoginPageQuery } from 'src/redux/services/auth/api';

import { Button } from './Button';
import { Icons } from './Icons';
import { Txt } from './Text';

const StyledButton = styled(Button)<SocialLoginButtonProps>`
  width: 300px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  }

  ${({ loginServer }) => {
    switch (loginServer) {
      case 'kakao':
        return css`
          &:not([disabled]) {
            color: #616161;
            background-color: #fbe80c;
          }
          &:not([disabled]):hover {
            color: #212121;
            background-color: #fee500;
          }
        `;
      case 'google':
        return css`
          &:not([disabled]) {
            color: #616161;
            background-color: #ffffff;
          }
          &:not([disabled]):hover {
            color: #212121;
            background-color: #f2f2f2;
          }
        `;
    }
  }}
`;

interface SocialLoginButtonProps {
  loginServer: LoginServer;
}

export const SocialLoginButton = ({ loginServer }: SocialLoginButtonProps) => {
  const [trigger, { data, isFetching }] = useLazyLoginPageQuery();
  const text: Record<LoginServer, string> = {
    kakao: '카카오 계정으로 로그인하기',
    google: '구글 계정으로 로그인하기',
  };

  useEffect(() => {
    if (data) {
      window.open(data.loginPageUrl, '_blank', 'width=500,height=800');
    }
  }, [data]);

  return (
    <StyledButton
      loginServer={loginServer}
      variant={'angular'}
      height={'60'}
      color={'secondary'}
      disabled={isFetching}
      onClick={() => trigger(loginServer)}
    >
      <Icons icon={loginServer} width={32} height={32} />
      <div style={{ width: '18px' }} />
      <Txt size="typo5" weight="medium">
        {text[loginServer]}
      </Txt>
    </StyledButton>
  );
};
