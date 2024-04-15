import React from 'react';

import styled from '@emotion/styled';

import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';
import { SignInButtons } from '#molecules/SignInButtons';

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 480px;
  height: 510px;

  background: linear-gradient(180deg, #f0f3ff 0%, #fff 100%);
  border-radius: 15px;

  @media (width <= 768px) {
    width: auto;
    height: auto;
    padding: 30px 20px;
  }
`;

export const SignInPopup: React.FC = () => {
  return (
    <Container>
      <Txt size="typo0" weight="bold" marginBottom={30}>
        로그인
      </Txt>
      <Txt size="typo4" weight="medium" marginBottom={7} color="#bdbdbd" textAlign="center">
        F-it에 오신 것을 환영해요!
      </Txt>
      <Txt size="typo4" weight="medium" marginBottom={65} color="#bdbdbd" textAlign="center">
        간편 로그인으로 서비스를 이용해보세요{' '}
        <Icons icon="emojiWinkingFace" width={20} height={20} />
      </Txt>
      <SignInButtons>
        <SignInButtons.Button provider="kakao" />
        <SignInButtons.Button provider="google" />
      </SignInButtons>
    </Container>
  );
};
