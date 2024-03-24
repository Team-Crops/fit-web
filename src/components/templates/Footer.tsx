'use client';

import styled from '@emotion/styled';

import { FooterContent } from '#organisms/FooterContent';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 393px;

  background-color: #f5f5f5;
  border-top: 1px solid #bdbdbd;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent />
    </StyledFooter>
  );
};
