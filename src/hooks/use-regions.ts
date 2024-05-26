import useSWR from 'swr';

import { Region } from '#/types';
import { fitFetcher } from '#/utilities/fetch';

const REGION_QUERY_KEY = '/v1/region';

interface GetRegionsResponse {
  regionList: {
    id: number;
    displayName: string;
  }[];
}

export function useRegionsQuery() {
  return useSWR(REGION_QUERY_KEY, async (url) => {
    const response = await fitFetcher<GetRegionsResponse>(url);
    return response.regionList as Region[];
  });
}
