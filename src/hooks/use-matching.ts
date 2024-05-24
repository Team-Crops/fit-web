import { useEffect } from 'react';

import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { useMatchingStore } from '#/stores';
import { Matching, MatchingStatus } from '#/types';
import { fitFetcher } from '#/utilities';

export const MATCHING_QUERY_KEY = '/v1/matching';
const MATCHING_START_KEY = '/v1/matching';
const MATCHING_CANCEL_KEY = '/v1/matching/cancel';

export const MATCHING_ALREADY_STARTED_CODE = 'matching-1';
export const MATCHING_NOT_FOUND_CODE = 'matching-2';

interface MatchingResponse {
  roomId: number;
  userId: number;
  positionId: number;
  status: MatchingStatus;

  expiredAt: string;
  createdAt: string;
}

export function useMatchingQuery() {
  const { data, error, isLoading, ...props } = useSWR<Matching>(
    MATCHING_QUERY_KEY,
    async (...args: Parameters<typeof fitFetcher>) => {
      const json: MatchingResponse = await fitFetcher(...args);
      return {
        id: json.roomId,
        userId: json.userId,
        positionId: json.positionId,
        status: json.status,

        expiredAt: json.expiredAt,
        createdAt: json.createdAt,
      } as Matching;
    },
    {
      errorRetryCount: 0,
    }
  );

  const setMatching = useMatchingStore((store) => store.setMatching);

  useEffect(() => {
    setMatching({ data, isLoading, error });
  }, [data, error, isLoading, setMatching]);

  return { data, error, isLoading, ...props };
}

async function sendPostRequest(url: string) {
  return await fitFetcher<Matching>(url, { method: 'POST' });
}

export function useMatchingStartMutation() {
  return useSWRMutation<Matching>(MATCHING_START_KEY, sendPostRequest, {
    onSuccess: (data) => mutate<Matching>(MATCHING_QUERY_KEY, data),
  });
}

export function useMatchingCancelMutation() {
  return useSWRMutation<Matching>(MATCHING_CANCEL_KEY, sendPostRequest, {
    onSuccess: () => mutate(MATCHING_QUERY_KEY, null, { revalidate: true }),
  });
}
