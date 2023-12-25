import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ConfirmationDialog } from 'src/components/atoms/ConfirmationDialog';

const meta = {
  title: 'Atoms/ConfirmationDialog',
  component: ConfirmationDialog,
  tags: ['atom', 'dialog'],
} satisfies Meta<typeof ConfirmationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function TemplateComponent({ isOpen: opened, ...args }: Story['args']) {
  const [isOpen, setOpen] = useState(opened);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <ConfirmationDialog
        isOpen={isOpen}
        onConfirm={() => setOpen(false)}
        confirmText="네"
        onCancel={() => setOpen(false)}
        {...args}
      />
    </>
  );
}

export const Primary: Story = {
  args: {
    isOpen: true,
    text: '예진님을 강퇴하시겠습니까?',
    helperText: '강퇴하시면 다시 초대할 수 없습니다.',
  },
  render: TemplateComponent,
};
