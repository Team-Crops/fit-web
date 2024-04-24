'use client';

import styled from '@emotion/styled';

import { UserBackgroundStatusStudent, UserBackgroundStatusWorker } from '#/types/user';
import { Select, type SelectProps } from '#atoms/Select';

const StyledSelect = styled(Select)`
  width: 100%;
  height: 36px;
`;

export const CareerSelect = (props: SelectProps) => {
  const careerStudentTexts: Record<UserBackgroundStatusStudent, string> = {
    HIGH_SCHOOL_GRADUATE: '고졸',
    UNIVERSITY_FRESHMAN: '대학교 1학년',
    UNIVERSITY_SOPHOMORE: '대학교 2학년',
    UNIVERSITY_JUNIOR: '대학교 3학년',
    UNIVERSITY_SENIOR: '대학교 4학년',
    GRADUATE_STUDENT: '대학원생',
    LEAVE_OF_ABSENCE_STUDENT: '휴학생',
  };

  const careerWorkerTexts: Record<UserBackgroundStatusWorker, string> = {
    WORKER_CONTRACT_WORKER: '인턴/계약직',
    WORKER_LESS_THAN_ONE_YEAR: '신입 (1년 미만)',
    WORKER_ONE_TO_THREE_YEARS: '1년 ~ 3년',
    WORKER_FOUR_TO_SEVEN_YEARS: '4년 ~ 7년',
    WORKER_EIGHT_TO_TEN_YEARS: '8년 ~ 9년',
    WORKER_OVER_TEN_YEARS: ' 10년 이상',
  };

  return (
    <StyledSelect {...props}>
      <Select.OptionGroup label="학력">
        {Object.entries(careerStudentTexts).map(([value, label]) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.OptionGroup>
      <Select.OptionGroup label="경력">
        {Object.entries(careerWorkerTexts).map(([value, label]) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.OptionGroup>
    </StyledSelect>
  );
};
