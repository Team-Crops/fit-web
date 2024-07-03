import { useMemo } from 'react';

import _ from 'lodash';
import { mutate } from 'swr';

import { Matching, NoticeMessage } from '#/types';
import { MATCHING_ROOM_QUERY_KEY } from '.';

export function useNoticeMessageHandler(matchingId?: Matching['id']) {
  const mutateMatchingRoom = useMemo(() => {
    if (_.isNil(matchingId)) {
      return null;
    }
    return () => mutate(MATCHING_ROOM_QUERY_KEY(matchingId));
  }, [matchingId]);

  return (message: NoticeMessage) => {
    switch (message.type) {
      case 'JOIN':
      case 'READY':
      case 'CANCEL_READY':
      case 'EXIT':
        mutateMatchingRoom?.();
    }
  };
}
