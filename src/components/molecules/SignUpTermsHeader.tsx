'use client';

import styled from '@emotion/styled';

import { FitLogo, Txt } from '#/components/atoms';

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
      <FitLogo height={26} />
      <Txt size="typo2" weight="bold">
        이용 약관
      </Txt>
    </Container>
  );
};
