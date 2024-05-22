'use client';

import { useCallback, useState, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { throttle } from 'lodash';

import { UserDataCard } from '#/components/organisms/TeamRecommend/UserDataCard';
import { UserDetailModal } from '#/components/organisms/TeamRecommend/UserDetailModal';
import { useRecommendUserQuery } from '#/hooks/use-recommend';
import { useRecommendStore } from '#/stores/recommend';

const GridBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 21px 20px;

  width: 1200px;
  margin: 0 auto 245px;
`;

export const UserCardList = () => {
  const scrollBlockRef = useRef<HTMLDivElement>(null);
  const [detailUserId, setDetailUserId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const currentFilter = useRecommendStore((state) => state.currentFilter);
  const recommendUserList = useRecommendStore((state) => state.recommendUserList);
  const setRecommendUserList = useRecommendStore((state) => state.setRecommendUserList);
  const { trigger: getUser } = useRecommendUserQuery();

  const recommendUserHandler = useCallback(() => {
    if (currentFilter === null) return;
    setIsFetching(true);
    getUser({ ...currentFilter, page }).then((data) => {
      setRecommendUserList([...recommendUserList, ...data.recommendUserList]);
      if (recommendUserList.length > page * 10) setPage((prevPage) => prevPage + 1);
      setIsFetching(false);
    });
  }, [currentFilter, getUser, page, setRecommendUserList, recommendUserList]);

  const handleScroll = throttle(() => {
    if (scrollBlockRef.current === null || isFetching) return;
    if (
      window.innerHeight + window.scrollY >=
      scrollBlockRef.current.offsetHeight + scrollBlockRef.current.offsetTop
    ) {
      recommendUserHandler();
    }
  }, 500);

  const cardClickHandler = useCallback((userId: number) => {
    setDetailUserId(userId);
  }, []);
  const detailModalCloseHandler = useCallback(() => {
    setDetailUserId(null);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isInit) {
      recommendUserHandler();
      setIsInit(false);
    }
  }, [isInit, recommendUserHandler]);

  return (
    <GridBlock ref={scrollBlockRef}>
      {recommendUserList.map((user) => (
        <UserDataCard key={user.userSummary.userId} userData={user} onClick={cardClickHandler} />
      ))}

      {detailUserId !== null && (
        <UserDetailModal userId={detailUserId} isClose={detailModalCloseHandler} />
      )}
    </GridBlock>
  );
};
