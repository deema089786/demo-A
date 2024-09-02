import type { Meta, StoryObj } from '@storybook/react';

import { GoogleSignUpButton } from './google-sign-up-button.component';

const meta: Meta<typeof GoogleSignUpButton> = {
  component: GoogleSignUpButton,
  title: 'Atoms/Google Sign Up Button',
};
export default meta;
type Story = StoryObj<typeof GoogleSignUpButton>;

export const Default: Story = {
  args: {
    clientId: '',
    size: 'large',
    text: 'signup_with',
  },
};
