export type AlarmCase =
  | 'FAILED_MATCHING'
  | 'STARTED_PROJECT'
  | 'START_PROJECT'
  | 'NEW_MATCHING_ROOM'
  | 'PROGRESS_MATCHING'
  | 'FORCE_OUT'
  | 'NEW_MESSAGE_MATCHING'
  | 'NEW_MESSAGE_PROJECT'
  | 'REPORT';

export interface Alarm {
  alarmCase: AlarmCase;
  createAt: string;
  id: number;
  isRead: boolean;
}

export interface AlarmQueryResponse {
  pageResult: {
    hasNext: boolean;
    values: Alarm[];
  };
}
