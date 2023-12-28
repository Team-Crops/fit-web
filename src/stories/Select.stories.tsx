import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Select } from 'src/components/atoms/Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['atom', 'select'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

function OptionsComponent(args: Story['args']) {
  const [value, setValue] = useState<string>();
  return (
    <Select
      value={value}
      helperText={`선택된 옵션의 value는 ${value} 입니다.`}
      onChange={(e) => setValue(e.target.value)}
      {...args}
    >
      <Select.Option value="0">없음</Select.Option>
      <Select.Option value="1">1개</Select.Option>
      <Select.Option value="2">2개</Select.Option>
      <Select.Option value="3">3개</Select.Option>
      <Select.Option value="4">4개</Select.Option>
      <Select.Option value="5">5개</Select.Option>
    </Select>
  );
}

export const WithOptions: Story = {
  args: {
    placeholder: '선택하세요.',
  },
  render: OptionsComponent,
};

function OptionGroupsComponent(args: Story['args']) {
  const [value, setValue] = useState<string>();
  return (
    <Select
      value={value}
      helperText={`선택된 옵션의 value는 ${value} 입니다.`}
      onChange={(e) => setValue(e.target.value)}
      {...args}
    >
      <Select.OptionGroup label="학력">
        <Select.Option value="highschool">고졸</Select.Option>
        <Select.Option value="freshman">대학교 1학년</Select.Option>
        <Select.Option value="sophomore">대학교 2학년</Select.Option>
        <Select.Option value="junior">대학교 3학년</Select.Option>
        <Select.Option value="senior">대학교 4학년</Select.Option>
        <Select.Option value="alumni">대학원생</Select.Option>
        <Select.Option value="onleave">휴학생</Select.Option>
      </Select.OptionGroup>
      <Select.OptionGroup label="경력">
        <Select.Option value="intern">인턴/계약직</Select.Option>
        <Select.Option value="0">신입(1년미만)</Select.Option>
        <Select.Option value="1">1년 ~ 3년</Select.Option>
        <Select.Option value="4">4년 ~ 7년</Select.Option>
        <Select.Option value="8">8년 ~ 10년</Select.Option>
        <Select.Option value="10">10년 이상</Select.Option>
      </Select.OptionGroup>
    </Select>
  );
}

export const WithOptionGroups: Story = {
  args: {
    placeholder: '선택하세요.',
  },
  render: OptionGroupsComponent,
};
