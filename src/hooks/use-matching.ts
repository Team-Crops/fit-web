import useSWR from 'swr';

import { Matching } from '#/types';
import { fitFetcher } from '#/utilities';

const MATCHING_QUERY_KEY = '/v1/matching';

export const MATCHING_NOT_FOUND_CODE = 'matching-2';

export function useMatchingQuery() {
  return useSWR<Matching>(MATCHING_QUERY_KEY, fitFetcher, {
    errorRetryCount: 0,
  });
}
