// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import io from 'socket.io-client';

import { getTokens } from '#/utilities/session';

export const fitSocket = (query: Record<string, string | number | null | undefined>) =>
  io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    path: '',
    query: { ...query, auth: getTokens()?.accessToken },
    transports: ['websocket'],
  });
