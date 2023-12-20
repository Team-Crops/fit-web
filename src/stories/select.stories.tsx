import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { Select } from 'src/components/atoms/select';

const meta = {
  title: 'Atom/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['atom', 'select'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderComponent = (args: Story['args']) => {
  return (
    <Select {...args}>
      <Select.Optgroup label="학력">
        <Select.Option value="">고졸</Select.Option>
        <Select.Option value="">대학교 1학년</Select.Option>
        <Select.Option value="">대학교 2학년</Select.Option>
        <Select.Option value="">대학교 3학년</Select.Option>
        <Select.Option value="">대학교 4학년</Select.Option>
        <Select.Option value="">대학원생</Select.Option>
        <Select.Option value="">휴학생</Select.Option>
      </Select.Optgroup>
      <Select.Optgroup label="경력">
        <Select.Option value="">인턴/계약직</Select.Option>
        <Select.Option value="">신입(1년미만)</Select.Option>
        <Select.Option value="">1년 ~ 3년</Select.Option>
        <Select.Option value="">4년 ~ 7년</Select.Option>
        <Select.Option value="">8년 ~ 10년</Select.Option>
        <Select.Option value="">10년 이상</Select.Option>
      </Select.Optgroup>
    </Select>
  );
};

export const MediumSize: Story = {
  args: {
    placeholder: '선택하세요.',
    width: 'medium',
  },
  render: renderComponent,
};

export const LargeSize: Story = {
  args: {
    placeholder: '선택하세요.',
    width: 'large',
  },
  render: renderComponent,
};

export const Error: Story = {
  args: {
    placeholder: '선택하세요.',
    error: true,
  },
  render: renderComponent,
};
