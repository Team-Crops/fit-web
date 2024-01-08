import { Icons } from 'src/components/atoms/Icons';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/Icons',
  component: Icons,
  tags: ['atom', 'icons'],
} satisfies Meta<typeof Icons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: {
    icon: 'account',
    width: 200,
    height: 200,
  },
};
