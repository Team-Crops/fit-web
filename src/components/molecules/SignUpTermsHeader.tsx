'use client';

import styled from '@emotion/styled';

import { Icons } from '#atoms/Icons';
import { Txt } from '#atoms/Text';

const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 90px;

  background-color: #fafafa;
`;

export const SignUpTermsHeader = () => {
  return (
    <Container>
      <Icons icon="logo" height={26} />
      <Txt size="typo2" weight="bold">
        이용 약관
      </Txt>
    </Container>
  );
};
