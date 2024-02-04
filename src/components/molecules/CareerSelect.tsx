import { Select, type SelectProps } from '#atoms/Select';

export const CareerSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <Select.OptionGroup label="학력">
        <Select.Option value="highschool">고졸</Select.Option>
        <Select.Option value="university-1st-year">대학교 1학년</Select.Option>
        <Select.Option value="university-2nd-year">대학교 2학년</Select.Option>
        <Select.Option value="university-3rd-year">대학교 3학년</Select.Option>
        <Select.Option value="university-4th-year">대학교 4학년</Select.Option>
        <Select.Option value="university-graduate">대학원생</Select.Option>
        <Select.Option value="university-leave-of-absence">휴학생</Select.Option>
      </Select.OptionGroup>
      <Select.OptionGroup label="경력">
        <Select.Option value="intern">인턴/계약직</Select.Option>
        <Select.Option value="less-than-1">신입 (1년 미만)</Select.Option>
        <Select.Option value="1-to-3-years">1년 ~ 3년</Select.Option>
        <Select.Option value="4-to-7-years">4년 ~ 7년</Select.Option>
        <Select.Option value="8-to-10-years">8년 ~ 10년</Select.Option>
        <Select.Option value="more-than-10-years">10년 이상</Select.Option>
      </Select.OptionGroup>
    </Select>
  );
};
