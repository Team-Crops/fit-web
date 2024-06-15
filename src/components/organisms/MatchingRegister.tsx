'use client';

import styled from '@emotion/styled';

import _ from 'lodash';

import { MatchingButtons } from '#/components/molecules/MatchingButtons';
import { useMeQuery } from '#/hooks/use-user';
import { UserDetails } from './UserDetails';
import { Loading } from '../atoms';

interface MatchingProfileProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MatchingRegister = ({ ...props }: MatchingProfileProps) => {
  const { data: me } = useMeQuery();

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
        <MatchingButtons.LinkButton href="/mypage" color="secondary">
          수정하기
        </MatchingButtons.LinkButton>
        <MatchingButtons.SearchButton>확인</MatchingButtons.SearchButton>
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
