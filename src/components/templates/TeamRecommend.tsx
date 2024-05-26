'use client';

import { useCallback, useState } from 'react';

import { RecommendUserQueryOptions, useRecommendUserQuery } from '#/hooks/use-recommend';
import { RecommendFilter } from './TeamRecommend/RecommendFilter';
import { UserCardList } from './TeamRecommend/UserCardList';
import { Loading } from '../atoms';

export const TeamRecommend = () => {
  const [options, setOptions] = useState<RecommendUserQueryOptions>({});

  const {
    data: users,
    mutate: mutateCachedUsers,
    isValidating,
    setSize,
  } = useRecommendUserQuery(options);

  const queryTrigger = useCallback(() => setSize((s) => s + 1), [setSize]);
  const mutateCachedLike = useCallback(
    (userId: number, isLiked: boolean | Promise<boolean>, optimisticIsLiked: boolean) =>
      mutateCachedUsers(
        async () =>
          users
            ? await Promise.all(
                users.map(
                  async (users) =>
                    await Promise.all(
                      users.map(async (u) =>
                        u.id === userId ? { ...u, isLiked: await isLiked } : u
                      )
                    )
                )
              )
            : users,
        {
          optimisticData: (users) =>
            users?.map((users) =>
              users.map((u) => (u.id === userId ? { ...u, isLiked: optimisticIsLiked } : u))
            ) ?? [],
        }
      ),
    [mutateCachedUsers, users]
  );

  if (!users) return <Loading />;
  return (
    <>
      <RecommendFilter defaultOptions={options} trigger={setOptions} />
      <UserCardList
        users={users?.flat()}
        isLoadingUsers={isValidating}
        hasNext={users[users.length - 1].length > 0}
        queryTrigger={queryTrigger}
        mutateCachedLike={mutateCachedLike}
      />
    </>
  );
};
