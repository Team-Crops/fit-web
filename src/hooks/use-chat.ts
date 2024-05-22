import useSWRSubscription from 'swr/subscription';

import { fitSocket } from '#/utilities/socket';

export function useChatSubscription(id: number) {
  return useSWRSubscription(['roomId', id], ([_, id], { next }) => {
    const socket = fitSocket(`/?roomId=${id}`);
    socket.on('get_message', (event) => next(null, event.data));
    return () => socket.disconnect();
  });
}
