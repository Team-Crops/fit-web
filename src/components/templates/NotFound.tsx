import Link from 'next/link';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms/Text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NotFound = () => {
  return (
    <Container>
      <Txt size="typo2" weight="bold">
        Not Found
      </Txt>
      <Txt size="typo4" weight="regular">
        Could not find requested resource
      </Txt>
      <Link href="/">Return Home</Link>
    </Container>
  );
};
