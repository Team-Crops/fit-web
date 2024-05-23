// @ts-expect-error
import io from 'socket.io-client';

import { getTokens } from '#/utilities/session';

export const fitSocket = (query: Record<string, string | number | null | undefined>) =>
  io('ws://dev-socket.f-it.team', {
    path: '',
    query: { ...query, auth: getTokens()?.accessToken },
    transports: ['websocket'],
  });
