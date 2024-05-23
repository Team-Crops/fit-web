import { useEffect } from 'react';

import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { useMatchingStore } from '#/stores';
import { Matching } from '#/types';
import { fitFetcher } from '#/utilities';

export const MATCHING_QUERY_KEY = '/v1/matching';
const MATCHING_START_KEY = '/v1/matching';
const MATCHING_CANCEL_KEY = '/v1/matching/cancel';

export const MATCHING_ALREADY_STARTED_CODE = 'matching-1';
export const MATCHING_NOT_FOUND_CODE = 'matching-2';

export function useMatchingQuery() {
  const { data, isLoading, error } = useSWR<Matching>(MATCHING_QUERY_KEY, fitFetcher, {
    errorRetryCount: 0,
  });

  const setMatching = useMatchingStore((store) => store.setMatching);

  useEffect(() => {
    setMatching({ data, isLoading, error });
  }, [data, error, isLoading, setMatching]);

  return { data, isLoading, error };
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
