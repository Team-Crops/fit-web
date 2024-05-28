'use client';

import styled from '@emotion/styled';

import { HeaderUserBlock } from '#/components/molecules/HeaderUserBlock';
import { useMeQuery } from '#/hooks/use-user';
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
  const { data: me } = useMeQuery();

  return (
    <ContentBlock>
      <HeaderLogo />
      <HeaderNav />
      {me ? <HeaderUserBlock /> : <HeaderLoginBlock />}
    </ContentBlock>
  );
};
