'use client';

import styled from '@emotion/styled';

import { Footer } from '#templates/Footer';
import { Header } from '#templates/Header';
import { MatchingTemplate } from '#templates/MatchingTemplate';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

export default function Matching() {
  return (
    <Container>
      <Header />
      <MatchingTemplate />
      <Footer />
    </Container>
  );
}
