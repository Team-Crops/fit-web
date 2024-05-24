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
  return useSWR<Position[]>(
    POSITIONS_QUERY_KEY,
    async (...params: Parameters<typeof fitFetcher>) => {
      const json: PositionsQueryResponse = await fitFetcher(...params);
      return json.positionList;
    }
  );
}
