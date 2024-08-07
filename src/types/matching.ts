import type { User } from '#/types';

export enum MatchingStatus {
  REGISTER = 'REGISTER',
  WAITING = 'WAITING',
  MATCHED = 'MATCHED',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED',
  FORCED_OUT = 'FORCED_OUT',
  EXITED = 'EXITED',
  COMPLETED = 'COMPLETED',
}

export interface Matching {
  id: number | null;
  userId: number;
  positionId: number;
  status: MatchingStatus;

  expiredAt: string;
  createdAt: string;
}

export interface MatchingRoom {
  id: NonNullable<Matching['id']>;

  hostId: User['id'];
  chatId: number;
  matchingUsers: MatchingUser[];
  isCompleted: boolean;

  completedAt: string | null;
}

export interface MatchingUser
  extends Pick<User, 'id' | 'nickname' | 'profileImageUrl' | 'positionId'> {
  isHost: boolean;
  isReady: boolean;
}
