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

  projectCount: number | null;
  activityHour: number | null;
  introduce: string | null;
  portfolioUrl: string | null;
  backgroundText: string | null;
  isOpenPhoneNum: boolean | null;
  linkList: Link[] | null;
  isOpenProfile: boolean | null;
  phoneNumber: string | null;
  positionId: number | null;
  regionId: number | null;
  backgroundStatus: UserBackgroundStatus | null;
  nickname: string | null;
  skillIdList: number[] | null;
  profileImageUrl: string | null;
  email: string | null;
  status: string | null;
  username: string | null;
}

export interface ProjectUser
  extends Pick<User, 'id' | 'positionId' | 'username' | 'profileImageUrl'> {}

export interface ChatUser
  extends Pick<User, 'id' | 'positionId' | 'nickname' | 'profileImageUrl'> {}
