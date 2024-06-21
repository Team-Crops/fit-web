import useSWRInfinite from 'swr/infinite';

import { AlarmQueryResponse } from '#/types';
import { fitFetcher } from '#/utilities';

const ALARM_QUERY_KEY = (index: number, previousPageData: AlarmQueryResponse | null) => {
  if (previousPageData && previousPageData.pageResult.values.length === 0) {
    return null;
  }
  return `/v1/alarm?page=${index}`;
};

export function useAlarmQuery() {
  return useSWRInfinite(ALARM_QUERY_KEY, async (url) => {
    return await fitFetcher<AlarmQueryResponse>(url);
  });
}
