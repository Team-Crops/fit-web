import { UserBackgroundStatus } from '#/types/user';

const careerStudentTexts: Record<string, string> = {
  고졸: 'HIGH_SCHOOL_GRADUATE',
  '대학교 1학년': 'UNIVERSITY_FRESHMAN',
  '대학교 2학년': 'UNIVERSITY_SOPHOMORE',
  '대학교 3학년': 'UNIVERSITY_JUNIOR',
  '대학교 4학년': 'UNIVERSITY_SENIOR',
  대학원생: 'GRADUATE_STUDENT',
  휴학생: 'LEAVE_OF_ABSENCE_STUDENT',
};
const careerWorkerTexts: Record<string, string> = {
  '인턴/계약직': 'WORKER_CONTRACT_WORKER',
  '신입 (1년 미만)': 'WORKER_LESS_THAN_ONE_YEAR',
  '1년 ~ 3년': 'WORKER_ONE_TO_THREE_YEARS',
  '4년 ~ 7년': 'WORKER_FOUR_TO_SEVEN_YEARS',
  '8년 ~ 9년': 'WORKER_EIGHT_TO_TEN_YEARS',
  ' 10년 이상': 'WORKER_OVER_TEN_YEARS',
};

export const careerTextToValue = (value?: UserBackgroundStatus | null) => {
  if (value === undefined || value === null) return;
  return (
    Object.entries(careerStudentTexts).find(([key, text]) => text === value)?.[0] ||
    Object.entries(careerWorkerTexts).find(([key, text]) => text === value)?.[0]
  );
};
export const careerValueToText = (text?: string) => {
  if (text === undefined) return;
  return careerStudentTexts[text] || careerWorkerTexts[text];
};
export const checkStudent = (value?: UserBackgroundStatus | null) => {
  if (value === undefined || value === null) return;
  return Object.values(careerStudentTexts).includes(value);
};
