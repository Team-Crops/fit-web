import React from 'react';

import styled from '@emotion/styled';

import { SocialSignInButton } from '#atoms/SocialSignInButton';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

interface SignInButtonsProps {
  children: React.ReactNode;
}

export const SignInButtons = ({ children }: SignInButtonsProps) => {
  return <Column>{children}</Column>;
};

SignInButtons.Button = SocialSignInButton;
