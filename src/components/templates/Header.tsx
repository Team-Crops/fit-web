'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { media } from '#/utilities';
import { HeaderContent } from '#organisms/HeaderContent';

const SpaceCSS = css`
  width: 100%;
  height: 100px;
`;
const StyledHeader = styled.header`
  position: fixed;
  z-index: 9999;

  padding: 0 20px;

  background: #fff;
  border-bottom: 1px solid #eee;

  ${SpaceCSS}
  ${media.xxlarge} {
    position: relative;
  }
`;
const HeaderSpace = styled.div`
  ${SpaceCSS}
  ${media.xxlarge} {
    display: none;
  }
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
