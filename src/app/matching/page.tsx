'use client';

import styled from '@emotion/styled';

import { Matching } from '#/components/templates/Matching';
import { Footer } from '#templates/Footer';
import { Header } from '#templates/Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default function MatchingPage() {
  return (
    <Container>
      <Header />
      <Matching />
      <Footer />
    </Container>
  );
}
