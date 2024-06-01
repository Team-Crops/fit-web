'use client';

import { type HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import _ from 'lodash';
import { mutate } from 'swr';

import { MatchingButtons } from '#/components/molecules/matching/MatchingButtons';
import { MATCHING_QUERY_KEY, useMatchingStartMutation } from '#/hooks/use-matching';
import { useMeQuery } from '#/hooks/use-user';
import { UserDetails } from './UserDetails';
import { Loading } from '../atoms';

interface MatchingProfileProps extends HTMLAttributes<HTMLDivElement> {}

export const MatchingRegister = ({ ...props }: MatchingProfileProps) => {
  const { data: me } = useMeQuery();
  const { trigger: startMatching, isMutating: isStarting } = useMatchingStartMutation();

  const router = useRouter();

  return (
    <Container {...props}>
      {me ? (
        <UserDetailsContainer>
          <UserDetails userId={me.id} />
        </UserDetailsContainer>
      ) : (
        <Loading />
      )}
      <MatchingButtons>
        <MatchingButtons.Button color="secondary" onClick={() => router.push('/mypage')}>
          수정하기
        </MatchingButtons.Button>
        <MatchingButtons.Button
          disabled={isStarting}
          onClick={async () => {
            mutate(MATCHING_QUERY_KEY, await startMatching());
          }}
        >
          확인
        </MatchingButtons.Button>
      </MatchingButtons>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

const UserDetailsContainer = styled.div`
  padding-bottom: 40px;
  border: 1px solid #bdbdbd;
  border-radius: 12px;
`;
