'use client';

import { HeaderContent } from '#organisms/HeaderContent';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SpaceCSS = css`
  width: 100%;
  height: 100px;
`;
const StyledHeader = styled.header`
  position: fixed;
  ${SpaceCSS}

  border-bottom: 1px solid #eee;
  background: #fff;
  z-index: 3;
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
