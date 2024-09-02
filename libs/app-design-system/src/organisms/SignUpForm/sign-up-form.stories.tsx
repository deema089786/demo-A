import type { Meta, StoryObj } from '@storybook/react';

import { SignUpForm } from './sign-up-form.component';

const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm,
  title: 'Organisms/Sign Up Form',
};
export default meta;
type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  args: {},
};

export const WithGoogleButton: Story = {
  args: { googleClientId: 'test' },
};
