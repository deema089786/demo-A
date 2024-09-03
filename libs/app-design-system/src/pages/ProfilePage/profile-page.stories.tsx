import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import { ProfilePage } from './profile-page.component';

const meta: Meta<typeof ProfilePage> = {
  decorators: [withRouter],
  component: ProfilePage,
  title: 'Pages/Profile Page',
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Default: Story = {
  args: {
    profileName: 'Emma Smith',
    profileImageSrc: '/images/user-logo.png',
    isCreatePasswordEnabled: true,
  },
};
