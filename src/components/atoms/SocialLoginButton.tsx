'use client';

import Link from 'next/link';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';
import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { LoginServer } from '#/entities/loginServer';
import { useLoginPageQuery } from '#/redux/features/auth/api';

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
          color: #616161;
          background-color: #fbe80c;

          &:hover {
            color: #212121;
            background-color: #fee500;
          }

          &:disabled {
            background-color: rgba(251, 232, 12, 0.5);
          }
        `;
      case 'google':
        return css`
          color: #616161;
          background-color: #ffffff;

          &:hover {
            color: #212121;
            background-color: #f2f2f2;
          }

          &:disabled {
            background-color: rgba(255, 255, 255, 0.5);
          }
        `;
    }
  }}
`;

interface SocialLoginButtonProps {
  loginServer: LoginServer;
}

export const SocialLoginButton = ({ loginServer }: SocialLoginButtonProps) => {
  const { data, isLoading } = useLoginPageQuery(loginServer);
  const text: Record<LoginServer, string> = {
    kakao: '카카오 계정으로 로그인하기',
    google: '구글 계정으로 로그인하기',
  };

  return (
    <Link href={data?.loginPageUrl ?? ''}>
      <StyledButton
        loginServer={loginServer}
        variant={'angular'}
        height={'60'}
        color={'secondary'}
        disabled={isLoading}
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
