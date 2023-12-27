import type { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { Input } from 'src/components/atoms/Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['atom', 'input'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const RenderComponent = (args: Story['args']) => {
  const [testValue, setTestValue] = useState('');
  const onChangeTestValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (args !== undefined) args.value = e.target.value;
      setTestValue(e.target.value);
    },
    [args]
  );

  return <Input value={testValue} onChange={onChangeTestValue} {...args} />;
};

export const Primary: Story = {
  args: {
    placeholder: '이름을 입력하세요',
  },
  render: RenderComponent,
};
