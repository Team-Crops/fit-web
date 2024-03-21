'use client';
import Link from 'next/link';

import styled from '@emotion/styled';

import { Button } from '#/components/atoms/Button';
import { Txt } from '#/components/atoms/Text';
import { MatchingSequenceSwiper } from '#/components/organisms/MatchingInfo/MatchingSequenceSwiper';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 194px 0 130px;
`;

export const MatchingSequence = () => {
  return (
    <StyledSection>
      <Txt size="typo0" weight="bold" color="#FF706C" marginBottom={62}>
        랜덤 팀 매칭은 이렇게 이루어져요
      </Txt>
      <MatchingSequenceSwiper />
      <Link href={'/matching'}>
        <Button variant={'round'} height={'70'} color={'primary'}>
          매칭 시작하기
        </Button>
      </Link>
    </StyledSection>
  );
};
