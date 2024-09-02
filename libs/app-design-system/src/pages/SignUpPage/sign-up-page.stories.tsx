import type { Meta, StoryObj } from '@storybook/react';

import { SignUpPage } from './sign-up-page.component';

const meta: Meta<typeof SignUpPage> = {
  component: SignUpPage,
  title: 'Pages/Sign Up Page',
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof SignUpPage>;

export const Default: Story = {
  args: {},
};
