import { Link } from './link';

export type UserBackgroundStatusStudent =
  | 'HIGH_SCHOOL_GRADUATE'
  | 'UNIVERSITY_FRESHMAN'
  | 'UNIVERSITY_SOPHOMORE'
  | 'UNIVERSITY_JUNIOR'
  | 'UNIVERSITY_SENIOR'
  | 'GRADUATE_STUDENT'
  | 'LEAVE_OF_ABSENCE_STUDENT';

export type UserBackgroundStatusWorker =
  | 'WORKER_CONTRACT_WORKER'
  | 'WORKER_LESS_THAN_ONE_YEAR'
  | 'WORKER_ONE_TO_THREE_YEARS'
  | 'WORKER_FOUR_TO_SEVEN_YEARS'
  | 'WORKER_EIGHT_TO_TEN_YEARS'
  | 'WORKER_OVER_TEN_YEARS';

export type UserBackgroundStatus = UserBackgroundStatusStudent | UserBackgroundStatusWorker;

export interface User {
  id: number;

  projectCount?: number;
  activityHours?: number;
  introduce?: string;
  portfolioUrl?: string;
  backgroundText?: string;
  isOpenPhoneNum?: boolean;
  linkList?: Link[];
  isOpenProfile?: boolean;
  phoneNumber?: string;
  positionId?: number;
  regionId?: number;
  backgroundStatus?: UserBackgroundStatus;
  nickname?: string;
  skillIdList?: number[];
  profileImageUrl?: string;
  email?: string;
  status?: string;
  username?: string;
}
