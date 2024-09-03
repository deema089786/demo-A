import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import { SignUpPage } from './sign-up-page.component';

const meta: Meta<typeof SignUpPage> = {
  decorators: [withRouter],
  component: SignUpPage,
  title: 'Pages/Sign Up Page',
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof SignUpPage>;

export const Default: Story = {
  args: {
    googleClientId: 'test',
    onSignUpByGoogleToken: () => undefined,
    onSignUpByCredentials: () => undefined,
    isLoading: false,
  },
};
