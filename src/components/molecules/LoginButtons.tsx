import React from 'react';

import styled from '@emotion/styled';

import { SocialLoginButton } from '#atoms/SocialLoginButton';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

interface LoginButtonsProps {
  children: React.ReactNode;
}

export const LoginButtons = ({ children }: LoginButtonsProps) => {
  return <Column>{children}</Column>;
};

LoginButtons.Button = SocialLoginButton;
