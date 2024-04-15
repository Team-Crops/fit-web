'use client';

import styled from '@emotion/styled';

import { UserDataCard } from '#/components/organisms/TeamRecommend/UserDataCard';
import { UserDetailModal } from '#/components/organisms/TeamRecommend/UserDetailModal';

const GridBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 21px 20px;

  width: 1200px;
  margin: 0 auto 245px;
`;

export const UserCardList = () => {
  return (
    <GridBlock>
      <UserDataCard />
      <UserDataCard />
      <UserDataCard />
      <UserDataCard />
      <UserDataCard />

      {/* 열고닫기는 api 연결할 때 추가할 예정 */}
      {/* <UserDetailModal /> */}
    </GridBlock>
  );
};
