import _ from 'lodash';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { ApiError, Matching, MatchingStatus } from '#/types';
import { fitFetcher } from '#/utilities';

export const MATCHING_QUERY_KEY = '/v1/matching';
const MATCHING_START_KEY = '/v1/matching';
const MATCHING_CANCEL_KEY = '/v1/matching/cancel';

interface MatchingResponse {
  roomId: number;
  userId: number;
  positionId: number;
  status: string;
  expiredAt: string;
  createdAt: string;
}

export function useMatchingQuery() {
  return useSWR(
    MATCHING_QUERY_KEY,
    async (url) => {
      try {
        const json = await fitFetcher<MatchingResponse>(url);
        return {
          id: json.roomId,
          userId: json.userId,
          positionId: json.positionId,
          status: json.status,
          expiredAt: json.expiredAt,
          createdAt: json.createdAt,
        } as Matching;
      } catch (error) {
        if (
          _.isObject(error) &&
          ApiError.isApiError(error) &&
          error.code === ApiError.MATCHING_NOT_FOUND_CODE
        ) {
          return { id: null, status: MatchingStatus.REGISTER };
        }
        throw error;
      }
    },
    { shouldRetryOnError: false }
  );
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
