import { useEffect, useMemo } from 'react';

import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { useMatchingStore } from '#/stores';
import { MatchingRoom, User } from '#/types';
import { fitFetcher } from '#/utilities';
import { MATCHING_QUERY_KEY } from './use-matching';

const MATCHING_ROOM_QUERY_KEY = (id: number) => `/v1/matching/room/${id}`;
const MATCHING_ROOM_COMPLETE_KEY = (id: number) => `/v1/matching/room/${id}/complete`;
const MATCHING_ROOM_FORCE_OUT_KEY = (id: number) => `/v1/matching/room/${id}/force-out`;
const MATCHING_ROOM_READY_KEY = (id: number) => `/v1/matching/room/${id}/ready`;
const MATCHING_ROOM_CANCEL_KEY = (id: number) => `/v1/matching/room/${id}/cancel`;

export function useMatchingRoomQuery(id?: MatchingRoom['id'] | null) {
  const { data, isLoading, error } = useSWR<MatchingRoomResponse>(
    !!id ? MATCHING_ROOM_QUERY_KEY(id) : null,
    fitFetcher
  );

  const matchingRoom = useMemo(() => convertDtoToMatchingRoom(data), [data]);

  const setRoom = useMatchingStore((store) => store.setRoom);

  useEffect(() => {
    if (id) {
      setRoom(id, { data: matchingRoom, isLoading, error });
    }
  }, [matchingRoom, error, isLoading, setRoom, id]);

  return { data: matchingRoom, isLoading, error };
}

export function useMatchingRoomForceOutMutation(
  roomId: MatchingRoom['id'],
  userId?: User['id'] | null
) {
  return useSWRMutation(MATCHING_ROOM_FORCE_OUT_KEY(roomId), (url, options) =>
    fitFetcher(url, { ...options, method: 'POST', body: JSON.stringify({ userId }) })
  );
}

export function useMatchingRoomCompleteMutation(roomId: MatchingRoom['id']) {
  return useSWRMutation(
    MATCHING_ROOM_COMPLETE_KEY(roomId),
    (url: string) => fitFetcher<null>(url, { method: 'POST' }),
    {
      onSuccess: () => {
        mutate(MATCHING_QUERY_KEY);
        mutate(MATCHING_ROOM_QUERY_KEY(roomId));
      },
    }
  );
}

interface MatchingRoomCompleteMutationArg {
  isReady: boolean;
}

export function useMatchingRoomReadyMutation(roomId: MatchingRoom['id']) {
  return useSWRMutation(
    MATCHING_ROOM_READY_KEY(roomId),
    (url: string, { arg: { isReady } }: { arg: MatchingRoomCompleteMutationArg }) => {
      return fitFetcher<null>(url, { method: 'POST', body: JSON.stringify({ isReady }) });
    },
    {
      onSuccess: () => {
        mutate(MATCHING_ROOM_QUERY_KEY(roomId));
      },
    }
  );
}

export function useMatchingRoomCancelMutation(roomId: MatchingRoom['id']) {
  return useSWRMutation(
    MATCHING_ROOM_CANCEL_KEY(roomId),
    (url: string) => fitFetcher<null>(url, { method: 'POST' }),
    {
      onSuccess: () => {
        mutate(MATCHING_QUERY_KEY);
        mutate(MATCHING_ROOM_QUERY_KEY(roomId));
      },
    }
  );
}

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
    username: string;
  }[];
  isCompleted: boolean;

  completedAt?: string;
}

function convertDtoToMatchingRoom(dto?: MatchingRoomResponse): MatchingRoom | undefined {
  if (!dto) {
    return dto;
  }

  return {
    id: dto.matchingRoomId,
    hostId: dto.hostUserId,
    chatId: dto.chatRoomId,
    matchingUsers: dto.matchingUserList.map((u) => ({
      id: u.userId,
      nickname: u.username,
      profileImageUrl: u.profileImageUrl,
      positionId: u.positionId,
      isHost: u.isHost,
      isReady: u.isReady,
    })),
    isCompleted: dto.isCompleted,
    completedAt: dto.completedAt ?? null,
  };
}
