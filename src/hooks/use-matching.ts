import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

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
  status: string;
  expiredAt: string;
  createdAt: string;
}

export function useMatchingQuery() {
  return useSWR(MATCHING_QUERY_KEY, async (url) => {
    const json = await fitFetcher<MatchingResponse>(url);
    return {
      id: json.roomId,
      userId: json.userId,
      positionId: json.positionId,
      status: json.status,
      expiredAt: json.expiredAt,
      createdAt: json.createdAt,
    } as Matching;
  });
}

export function useMatchingStartMutation() {
  return useSWRMutation(MATCHING_START_KEY, (url: string) =>
    fitFetcher<Matching>(url, { method: 'POST' })
  );
}

export function useMatchingCancelMutation() {
  return useSWRMutation(MATCHING_CANCEL_KEY, (url: string) =>
    fitFetcher<Matching>(url, { method: 'POST' })
  );
}
