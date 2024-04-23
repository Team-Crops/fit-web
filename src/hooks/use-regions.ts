import useSWR from 'swr';

import { fitFetcher } from '#/utilities/fetch';

const REGION_QUERY_KEY = '/v1/region';

interface GetRegionsResponse {
  regionList: {
    id: number;
    displayName: string;
  }[];
}

export function useRegionsQuery() {
  const { data, ...others } = useSWR<GetRegionsResponse>(REGION_QUERY_KEY, fitFetcher, {});
  return { data: data?.regionList, ...others };
}
