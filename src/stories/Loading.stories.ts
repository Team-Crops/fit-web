import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from '#/components/atoms';

const meta: Meta = {
  title: 'Atoms/Loading',
  component: Loading,
  tags: ['atom', 'loading'],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
