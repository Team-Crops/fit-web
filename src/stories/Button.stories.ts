import type { Meta, StoryObj } from '@storybook/react';

import { Button } from 'src/components/atoms/Button';

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
    size: '20',
    color: 'primary',
    children: 'Button',
  },
};
