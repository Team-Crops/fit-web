import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { Loading } from '#/components/atoms';
import { UserDataCard } from '#/components/organisms/TeamRecommend/UserDataCard';
import { UserDetailsModal } from '#/components/organisms/TeamRecommend/UserDetailsModal';
import { RecommendUser } from '#/types';

const GridBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 21px 20px;

  width: 1200px;
  margin: 0 auto 245px;
`;

interface UserCardListProps {
  users: RecommendUser[];
  isLoadingUsers: boolean;
  hasNext: boolean;
  queryTrigger: () => void;
  mutateCachedLike: (
    userId: number,
    isLiked: boolean | Promise<boolean>,
    optimisticIsLiked: boolean
  ) => void;
  isLoading: boolean;
}

export const UserCardList = ({
  users,
  isLoadingUsers,
  hasNext,
  queryTrigger,
  mutateCachedLike,
  isLoading,
}: UserCardListProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const [detailUserId, setDetailUserId] = useState<number | null>(null);
  const [isObserved, setIsObserved] = useState(false);

  useEffect(() => {
    if (isObserved && hasNext && !isLoadingUsers) {
      queryTrigger();
    }
  }, [hasNext, isLoadingUsers, isObserved, queryTrigger]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setIsObserved(true);
      } else {
        setIsObserved(false);
      }
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [queryTrigger]);

  return (
    <>
      {detailUserId && (
        <UserDetailsModal userId={detailUserId} onClose={() => setDetailUserId(null)} />
      )}
      <GridBlock>
        {users.map((user) => (
          <UserDataCard
            key={user.id}
            user={user}
            onClick={() => setDetailUserId(user.id)}
            mutateCachedLike={mutateCachedLike}
          />
        ))}
        {isLoading && <Loading ref={observerRef} />}
      </GridBlock>
    </>
  );
};
