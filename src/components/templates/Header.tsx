'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { HeaderContent } from '#organisms/HeaderContent';

const SpaceCSS = css`
  width: 100%;
  height: 100px;
`;
const StyledHeader = styled.header`
  position: fixed;
  z-index: 3;
  background: #fff;
  border-bottom: 1px solid #eee;

  ${SpaceCSS}
`;
const HeaderSpace = styled.div`
  ${SpaceCSS}
`;

export const Header = () => {
  return (
    <>
      <StyledHeader>
        <HeaderContent />
      </StyledHeader>
      <HeaderSpace />
    </>
  );
};
