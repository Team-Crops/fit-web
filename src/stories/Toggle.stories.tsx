import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from '#atoms/Toggle';

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  tags: ['atom', 'toggle'],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToggleTemplate = (args: Story['args']) => {
  const [checked, setChecked] = useState(args?.checked);

  useEffect(() => {
    setChecked(args?.checked);
  }, [args?.checked]);

  return (
    <Toggle
      {...args}
      checked={checked}
      onChange={() => {
        setChecked((checked) => !checked);
      }}
    />
  );
};

export const Primary: Story = {
  args: {
    checked: false,
    onChange: () => {
      console.log('onChange');
    },
  },
  render: ToggleTemplate,
};
