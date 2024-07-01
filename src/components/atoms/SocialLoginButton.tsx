'use client';

import Link from 'next/link';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';
import { Icons } from '#/components/atoms/Icons';
import { Txt } from '#/components/atoms/Text';
import { useLoginPageQuery } from '#/hooks/use-login-page';
import { SocialPlatform } from '#/types/social-platform';

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

  ${({ platform }) => {
    switch (platform) {
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
  platform: SocialPlatform;
}

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ platform }) => {
  const text: Record<SocialPlatform, string> = {
    kakao: '카카오톡으로 로그인하기',
    google: '구글로 로그인하기',
  };

  const { data: href, isLoading } = useLoginPageQuery(platform);

  return (
    <Link href={href ?? ''}>
      <StyledButton
        platform={platform}
        variant={'angular'}
        height={'60'}
        color={'secondary'}
        disabled={isLoading}
      >
        <Icons icon={platform} width={32} height={32} />
        <div style={{ width: '16px' }} />
        <Txt size="typo5" weight="medium">
          {text[platform]}
        </Txt>
      </StyledButton>
    </Link>
  );
};
