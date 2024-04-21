import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { Matching } from '#/types';
import { fitFetcher } from '#/utilities';

const MATCHING_QUERY_KEY = '/v1/matching';
const MATCHING_START_KEY = '/v1/matching';
const MATCHING_CANCEL_KEY = '/v1/matching/cancel';

export const MATCHING_ALREADY_STARTED_CODE = 'matching-1';
export const MATCHING_NOT_FOUND_CODE = 'matching-2';

export function useMatchingQuery() {
  return useSWR<Matching>(MATCHING_QUERY_KEY, fitFetcher, {
    errorRetryCount: 0,
  });
}

async function sendPostRequest(url: string) {
  return await fitFetcher<Matching>(url, { method: 'POST' });
}

export function useMatchingStart() {
  return useSWRMutation<Matching>(MATCHING_START_KEY, sendPostRequest, {
    onSuccess: (data) => mutate<Matching>(MATCHING_QUERY_KEY, data),
  });
}

export function useMatchingCancel() {
  return useSWRMutation<Matching>(MATCHING_CANCEL_KEY, sendPostRequest, {
    onSuccess: () => mutate(MATCHING_QUERY_KEY, null, { revalidate: true }),
  });
}
