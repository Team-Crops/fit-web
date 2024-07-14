import { useEffect, useState } from 'react';

import { mutate } from 'swr';

import { ALARM_QUERY_KEY, useAlarmQuery } from '.';

export const useAlarmBadge = () => {
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval>>();
  const [badged, setBadged] = useState(false);

  const { data } = useAlarmQuery();

  useEffect(() => {
    if (!intervalId) {
      const id = setInterval(() => {
        mutate(ALARM_QUERY_KEY(0));
      }, 10000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [intervalId]);

  useEffect(() => {
    if (data?.[0].pageResult.values?.at(0)?.isRead === false) {
      clearInterval(intervalId);
      setBadged(true);
    }
  }, [data, intervalId]);

  return badged;
};
