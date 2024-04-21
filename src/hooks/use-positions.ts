import useSWR from 'swr';

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
  const { data, ...others } = useSWR<PositionsQueryResponse>(POSITIONS_QUERY_KEY, fitFetcher, {});
  return {
    data: data?.positionList,
    ...others,
  };
}
