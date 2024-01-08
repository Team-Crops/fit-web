import { Txt } from '#atoms/Text';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/Txt',
  component: Txt,
  tags: ['Txt'],
  argTypes: {
    size: {
      control: { type: 'select' },
    },
    weight: {
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Txt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 'typo1',
    weight: 'bold',
    children: "Hello, I'm Carrot",
  },
};
