import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { CheckBox } from 'src/components/atoms/CheckBox';

const meta = {
  title: 'Atoms/CheckBox',
  component: CheckBox,
  tags: ['atom', 'input'],
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultTemplate(args: Story['args']) {
  const [isChecked, setChecked] = useState(args?.checked);

  useEffect(() => {
    setChecked(args?.checked);
  }, [args?.checked]);

  return (
    <div style={{ display: 'flex' }}>
      <CheckBox
        id="template"
        {...args}
        checked={isChecked}
        onChange={() => setChecked(!isChecked)}
      />
      <label htmlFor="template">{isChecked ? 'CHECKED' : 'UNCHECKED'}</label>
    </div>
  );
}

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  render: DefaultTemplate,
};
