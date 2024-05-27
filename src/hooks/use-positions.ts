import useSWR from 'swr';

import { Position } from '#/types';
import { fitFetcher } from '#/utilities/fetch';

const POSITIONS_QUERY_KEY = '/v1/skill-set/position';

interface PositionsQueryResponse {
  positionList: {
    id: number;
    displayName: string;
    imageUrl: string;
    skillList: {
      id: number;
      displayName: string;
    }[];
  }[];
}

export function usePositionsQuery() {
  return useSWR(
    POSITIONS_QUERY_KEY,
    async (url) => {
      const json = await fitFetcher<PositionsQueryResponse>(url);
      return json.positionList as Position[];
    },
    {
      dedupingInterval: 1000 * 60 * 10,
    }
  );
}
