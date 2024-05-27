'use client';

import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { HeaderUserBlock } from '#/components/molecules/HeaderUserBlock';
import { AuthTokens } from '#/types';
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
  const [tokens, setTokens] = useState<AuthTokens | null>(null);

  useEffect(() => {
    setTokens(getTokens());
  }, []);

  return (
    <ContentBlock>
      <HeaderLogo />
      <HeaderNav />
      {tokens ? <HeaderUserBlock /> : <HeaderLoginBlock />}
    </ContentBlock>
  );
};
