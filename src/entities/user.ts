import { Link } from './link';

export enum UserBackgroundStatusStudent {
  HIGH_SCHOOL_GRADUATE = 'HIGH_SCHOOL_GRADUATE',
  UNIVERSITY_FRESHMAN = 'UNIVERSITY_FRESHMAN',
  UNIVERSITY_SOPHOMORE = 'UNIVERSITY_SOPHOMORE',
  UNIVERSITY_JUNIOR = 'UNIVERSITY_JUNIOR',
  UNIVERSITY_SENIOR = 'UNIVERSITY_SENIOR',
  GRADUATE_STUDENT = 'GRADUATE_STUDENT',
  LEAVE_OF_ABSENCE_STUDENT = 'LEAVE_OF_ABSENCE_STUDENT',
}

export enum UserBackgroundStatusWorker {
  WORKER_CONTRACT_WORKER = 'WORKER_CONTRACT_WORKER',
  WORKER_LESS_THAN_ONE_YEAR = 'WORKER_LESS_THAN_ONE_YEAR',
  WORKER_ONE_TO_THREE_YEARS = 'WORKER_ONE_TO_THREE_YEARS',
  WORKER_FOUR_TO_SEVEN_YEARS = 'WORKER_FOUR_TO_SEVEN_YEARS',
  WORKER_EIGHT_TO_TEN_YEARS = 'WORKER_EIGHT_TO_TEN_YEARS',
  WORKER_OVER_TEN_YEARS = 'WORKER_OVER_TEN_YEARS',
}

export type UserBackgroundStatus = UserBackgroundStatusStudent | UserBackgroundStatusWorker;

export interface User {
  id: number;

  projectCount?: number;
  activityHour?: number;
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

export function isUserStudent(status: UserBackgroundStatus): status is UserBackgroundStatusStudent {
  return Object.values(UserBackgroundStatusStudent).includes(status as UserBackgroundStatusStudent);
}

export function isUserWorker(status: UserBackgroundStatus): status is UserBackgroundStatusWorker {
  return Object.values(UserBackgroundStatusWorker).includes(status as UserBackgroundStatusWorker);
}
