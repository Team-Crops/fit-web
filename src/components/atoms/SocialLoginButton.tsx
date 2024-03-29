'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getLoginPage } from '#/actions/auth';
import { Button } from '#/components/atoms/Button';
import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { SocialPlatform } from '#/entities/socialPlatform';

const StyledButton = styled(Button)<SocialLoginButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 300px;

  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 10%);

  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 20px 0 rgb(0 0 0 / 20%);
  }

  ${({ loginServer }) => {
    switch (loginServer) {
      case 'kakao':
        return css`
          color: #616161;
          background-color: #fbe80c;

          &:hover {
            color: #212121;
            background-color: #fee500;
          }

          &:disabled {
            background-color: rgb(251 232 12 / 50%);
          }
        `;
      case 'google':
        return css`
          color: #616161;
          background-color: #fff;

          &:hover {
            color: #212121;
            background-color: #f2f2f2;
          }

          &:disabled {
            background-color: rgb(255 255 255 / 50%);
          }
        `;
    }
  }}
`;

interface SocialLoginButtonProps {
  loginServer: SocialPlatform;
}

export const SocialLoginButton = ({ loginServer }: SocialLoginButtonProps) => {
  const text: Record<SocialPlatform, string> = {
    kakao: '카카오 계정으로 로그인하기',
    google: '구글 계정으로 로그인하기',
  };

  const [loginUrl, setLoginUrl] = useState('');

  useEffect(() => {
    async function fetchUrl() {
      const url = await getLoginPage(loginServer);
      setLoginUrl(url);
    }

    fetchUrl();
  }, [loginServer]);

  return (
    <Link href={loginUrl}>
      <StyledButton
        loginServer={loginServer}
        variant={'angular'}
        height={'60'}
        color={'secondary'}
        disabled={loginUrl === ''}
      >
        <Icons icon={loginServer} width={32} height={32} />
        <div style={{ width: '18px' }} />
        <Txt size="typo5" weight="medium">
          {text[loginServer]}
        </Txt>
      </StyledButton>
    </Link>
  );
};
