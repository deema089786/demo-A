import type { Meta, StoryObj } from '@storybook/react';

import { CreatePasswordForm } from './create-password-form.component';

const meta: Meta<typeof CreatePasswordForm> = {
  component: CreatePasswordForm,
  title: 'Organisms/Create Password Form',
};
export default meta;
type Story = StoryObj<typeof CreatePasswordForm>;

export const Default: Story = {
  args: { onSubmit: () => undefined, isLoading: false },
};
