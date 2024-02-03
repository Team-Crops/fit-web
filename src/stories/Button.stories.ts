import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '#atoms/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['Button'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'angular',
    height: '20',
    color: 'primary',
    children: 'Button',
  },
};
