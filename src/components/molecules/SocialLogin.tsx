import styled from '@emotion/styled';

import { SocialLoginButton } from '#atoms/SocialLoginButton';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

interface SocialLoginProps {
  children: React.ReactNode;
}

export const SocialLogin = ({ children }: SocialLoginProps) => {
  return <Column>{children}</Column>;
};

SocialLogin.Button = SocialLoginButton;