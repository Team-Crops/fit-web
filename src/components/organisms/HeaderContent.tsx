'use client';

import styled from '@emotion/styled';

import { HeaderUserBlock } from '#/components/molecules/HeaderUserBlock';
import { useAuthStore } from '#/stores/auth';
import { getTokens } from '#/utilities';
import { HeaderLoginBlock } from '#molecules/HeaderLoginBlock';
import { HeaderLogo } from '#molecules/HeaderLogo';
import { HeaderNav } from '#molecules/HeaderNav';

const ContentBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: min(100%, 1200px);
  height: 100%;
  margin: 0 auto;
`;

export const HeaderContent = () => {
  const tokens = getTokens();

  return (
    <ContentBlock>
      <HeaderLogo />
      <HeaderNav />
      {tokens ? <HeaderUserBlock /> : <HeaderLoginBlock />}
    </ContentBlock>
  );
};
