import {
  UserBackgroundStatus,
  UserBackgroundStatusStudent,
  UserBackgroundStatusWorker,
} from '#/types';

export function isBackgroundStatus(status: string): status is UserBackgroundStatus {
  return isUserStudent(status) || isUserWorker(status);
}

export function isUserStudent(status: string): status is UserBackgroundStatusStudent {
  return Object.values(UserBackgroundStatusStudent).includes(status as UserBackgroundStatusStudent);
}

export function isUserWorker(status: string): status is UserBackgroundStatusWorker {
  return Object.values(UserBackgroundStatusWorker).includes(status as UserBackgroundStatusWorker);
}

const backgroundStatusTextMap: Record<UserBackgroundStatus, string> = {
  HIGH_SCHOOL_GRADUATE: '고졸',
  UNIVERSITY_FRESHMAN: '대학교 1학년',
  UNIVERSITY_SOPHOMORE: '대학교 2학년',
  UNIVERSITY_JUNIOR: '대학교 3학년',
  UNIVERSITY_SENIOR: '대학교 4학년',
  GRADUATE_STUDENT: '대학원생',
  LEAVE_OF_ABSENCE_STUDENT: '휴학생',
  WORKER_CONTRACT_WORKER: '인턴/계약직',
  WORKER_LESS_THAN_ONE_YEAR: '신입 (1년 미만)',
  WORKER_ONE_TO_THREE_YEARS: '1년 ~ 3년',
  WORKER_FOUR_TO_SEVEN_YEARS: '4년 ~ 7년',
  WORKER_EIGHT_TO_TEN_YEARS: '8년 ~ 9년',
  WORKER_OVER_TEN_YEARS: '10년 이상',
};

export function getBackgroundStatusText(status?: string | null): null;
export function getBackgroundStatusText(status: UserBackgroundStatus): string;
export function getBackgroundStatusText(
  status?: UserBackgroundStatus | string | null
): string | null {
  if (!status || !isBackgroundStatus(status)) {
    return null;
  }
  return backgroundStatusTextMap[status];
}
