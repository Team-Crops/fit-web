import { io } from 'socket.io-client';

import { getTokens } from '#/utilities/session';

type GetMessageEvent = {};

export const fitSocket = (...args: Parameters<typeof io>) => {
  const [path, opts] = args;
  const tokens = getTokens();
  const extraHeaders = { ...opts?.extraHeaders, Authorization: `Bearer ${tokens?.accessToken}` };
  const socket = io(`ws://dev-socket.f-it.team${path}`, { ...opts, extraHeaders });
  return socket;
};
