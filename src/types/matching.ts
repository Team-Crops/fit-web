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
  expiredAt: string;
  createdAt: string;
  positionId: number;
  userId: number;
  roomId: number | null;
  status: MatchingStatus;
}
