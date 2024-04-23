'use client';

import styled from '@emotion/styled';

import { HeaderUserBlock } from '#/components/molecules/HeaderUserBlock';
import { useAuthStore } from '#/stores/auth';
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
  padding: 20px;
`;

export const HeaderContent = () => {
  const user = useAuthStore((store) => store.user);
  return (
    <ContentBlock>
      <HeaderLogo />
      <HeaderNav />
      {user ? <HeaderUserBlock /> : <HeaderLoginBlock />}
    </ContentBlock>
  );
};
