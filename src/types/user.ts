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

export function isUserStudent(status: UserBackgroundStatus): status is UserBackgroundStatusStudent {
  return Object.values(UserBackgroundStatusStudent).includes(status as UserBackgroundStatusStudent);
}

export function isUserWorker(status: UserBackgroundStatus): status is UserBackgroundStatusWorker {
  return Object.values(UserBackgroundStatusWorker).includes(status as UserBackgroundStatusWorker);
}

const nullUser: User = {
  id: -1,
  projectCount: null,
  activityHour: null,
  introduce: null,
  portfolioUrl: null,
  backgroundText: null,
  isOpenPhoneNum: null,
  linkList: null,
  isOpenProfile: null,
  phoneNumber: null,
  positionId: null,
  regionId: null,
  backgroundStatus: null,
  nickname: null,
  skillIdList: null,
  profileImageUrl: null,
  email: null,
  status: null,
  username: null,
};

export const exampleUsers: User[] = [
  {
    ...nullUser,
    id: -1,
    introduce: '경험에서 우러나온 문제점을 구황작물 팀원들과 함께 해결해나가고 싶어요',
    nickname: '예진',
    positionId: 1,
    profileImageUrl: 'https://d2ueefa0uvyh4f.cloudfront.net/file/profile/animal.jpeg',
  },
  {
    ...nullUser,
    id: -1,
    nickname: '은진',
    positionId: 2,
    introduce:
      '구황작물 팀원들과 함께 사용자들이 느끼는 문제점을 발견하고, 불편한 경험을 편안하게 해결할 수 있도록 만들고 싶어요',
    profileImageUrl: 'https://d2ueefa0uvyh4f.cloudfront.net/file/profile/animal.jpeg',
  },
  {
    ...nullUser,
    id: -1,
    nickname: '나현',
    positionId: 2,
    introduce: '팀원과 고민하여 사용자의 니즈 실현과 편안한 플로우를 만들고 싶어요',
    profileImageUrl: 'https://d2ueefa0uvyh4f.cloudfront.net/file/profile/animal.jpeg',
  },
  {
    ...nullUser,
    id: -1,
    nickname: '재웅',
    positionId: 3,
    introduce: '좋은 사람들과 좋은 팀에서 좋은 결과물을 만들고 싶어요',
    profileImageUrl: 'https://d2ueefa0uvyh4f.cloudfront.net/file/profile/animal.jpeg',
  },
  {
    ...nullUser,
    id: -1,
    nickname: '세헌',
    positionId: 3,
    introduce: '사용하기 쉽고 편리한 서비스를 만들고 싶어요',
    profileImageUrl: 'https://d2ueefa0uvyh4f.cloudfront.net/file/profile/animal.jpeg',
  },
  {
    ...nullUser,
    id: -1,
    nickname: '서린',
    positionId: 4,
    introduce: '신뢰할 수 있는 서비스를 만들고 싶어요',
    profileImageUrl: 'https://d2ueefa0uvyh4f.cloudfront.net/file/profile/animal.jpeg',
  },
  {
    ...nullUser,
    id: -1,
    nickname: '준찬',
    positionId: 4,
    introduce: '하나하나 고민해서 완벽에 가까운 제품을 제공하고 싶어요',
    profileImageUrl: 'https://d2ueefa0uvyh4f.cloudfront.net/file/profile/animal.jpeg',
  },
];
