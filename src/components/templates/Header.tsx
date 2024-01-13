'use client';

import { HeaderContent } from '#organisms/HeaderContent';
import styled from '@emotion/styled';

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  height: 100px;

  border-bottom: 1px solid #eee;
  background: #fff;
  z-index: 3;
`;
const HeaderShadow = styled.div`
  width: 100%;
  height: 100px;
`;

export const Header = () => {
  return (
    <>
      <StyledHeader>
        <HeaderContent />
      </StyledHeader>

      {/* 헤더의 높이만큼 공간을 차지하기 위해 만듦 (Header가 absolute기 때문) */}
      <HeaderShadow />
    </>
  );
};
