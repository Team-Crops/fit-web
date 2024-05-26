import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { MatchingRoom, User } from '#/types';
import { fitFetcher } from '#/utilities';
import { MATCHING_QUERY_KEY } from './use-matching';

const MATCHING_ROOM_QUERY_KEY = (id: number) => `/v1/matching/room/${id}`;
const MATCHING_ROOM_COMPLETE_KEY = (id: number) => `/v1/matching/room/${id}/complete`;
const MATCHING_ROOM_FORCE_OUT_KEY = (id: number) => `/v1/matching/room/${id}/force-out`;
const MATCHING_ROOM_READY_KEY = (id: number) => `/v1/matching/room/${id}/ready`;
const MATCHING_ROOM_CANCEL_KEY = (id: number) => `/v1/matching/room/${id}/cancel`;

export interface MatchingRoomResponse {
  matchingRoomId: number;

  hostUserId: number;
  chatRoomId: number;
  matchingUserList: {
    isHost: boolean;
    positionId: number;
    isReady: boolean;
    profileImageUrl: string;
    userId: number;
    nickname: string;
  }[];
  isCompleted: boolean;

  completedAt?: string;
}

export function useMatchingRoomQuery(id?: MatchingRoom['id'] | null) {
  return useSWR(id || id === 0 ? MATCHING_ROOM_QUERY_KEY(id) : null, async (url) => {
    const response = await fitFetcher<MatchingRoomResponse>(url);
    return {
      id: response.matchingRoomId,
      hostId: response.hostUserId,
      chatId: response.chatRoomId,
      matchingUsers: response.matchingUserList.map((u) => ({
        id: u.userId,
        nickname: u.nickname,
        profileImageUrl: u.profileImageUrl,
        positionId: u.positionId,
        isHost: u.isHost,
        isReady: u.isReady,
      })),
      isCompleted: response.isCompleted,
      completedAt: response.completedAt ?? null,
    } as MatchingRoom;
  });
}

export function useMatchingRoomCompleteMutation() {}

export function useMatchingRoomForceOutMutation(
  roomId: MatchingRoom['id'],
  userId?: User['id'] | null
) {
  return useSWRMutation(MATCHING_ROOM_FORCE_OUT_KEY(roomId), (url) =>
    fitFetcher<null>(url, { method: 'POST', body: JSON.stringify({ userId }) })
  );
}

export function useMatchingRoomReadyMutation(roomId: MatchingRoom['id']) {
  return useSWRMutation(
    MATCHING_ROOM_READY_KEY(roomId),
    (url, { arg: { isReady } }: { arg: { isReady: boolean } }) =>
      fitFetcher<null>(url, { method: 'POST', body: JSON.stringify({ isReady }) })
  );
}

export function useMatchingRoomCancelMutation(roomId: MatchingRoom['id']) {
  return useSWRMutation(MATCHING_ROOM_CANCEL_KEY(roomId), (url) =>
    fitFetcher<null>(url, { method: 'POST' })
  );
}
