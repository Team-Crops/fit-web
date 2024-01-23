'use client';

import StoreProvider from '#app/StoreProvider';
import { SocialLoginButton } from '#atoms/SocialLoginButton';
import styled from '@emotion/styled';
import { LoginServer } from 'src/entities/loginServer';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const SocialLoginButtons = () => {
  const loginServers: LoginServer[] = ['kakao', 'google'];
  return (
    <StoreProvider>
      <Column>
        {...loginServers.map((server) => <SocialLoginButton key={server} loginServer={server} />)}
      </Column>
    </StoreProvider>
  );
};
