import type { Meta, StoryObj } from '@storybook/react';
import { Service } from '@demo-A/app-modules';
import { withRouter } from 'storybook-addon-remix-react-router';

import { ServicesPage } from './services-page.component';

const meta: Meta<typeof ServicesPage> = {
  decorators: [withRouter],
  component: ServicesPage,
  title: 'Pages/Services Page',
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof ServicesPage>;

const services: Service[] = [
  {
    id: '1',
    variant: 'banner',
    title: 'Sea Food',
    shortDescription: 'Food service with delivering fresh sea food',
    longDescription: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
    status: 'active',
    inAppPath: '/services/1',
  },
  {
    id: '2',
    variant: 'banner',
    title: 'Sea Food',
    shortDescription: 'Food service with delivering fresh sea food',
    longDescription: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
    status: 'active',
    inAppPath: '/services/1',
  },
  {
    id: '3',
    variant: 'default',
    title: 'Sea Food',
    shortDescription: 'Food service with delivering fresh sea food',
    longDescription: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
    status: 'active',
    inAppPath: '/services/1',
  },
  {
    id: '4',
    variant: 'default',
    title: 'Sea Food',
    shortDescription: 'Food service with delivering fresh sea food',
    longDescription: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
    status: 'active',
    inAppPath: '/services/1',
  },
  {
    id: '5',
    variant: 'default',
    title: 'Sea Food',
    shortDescription: 'Food service with delivering fresh sea food',
    longDescription: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
    status: 'active',
    inAppPath: '/services/1',
  },
];

export const Default: Story = {
  args: {
    services,
    isEditModeEnabled: false,
    onCreateServiceClick: () => undefined,
  },
};
export const EditMode: Story = {
  args: {
    services,
    isEditModeEnabled: true,
    onCreateServiceClick: () => undefined,
  },
};
export const NoServices: Story = {
  args: {
    services: [],
    isEditModeEnabled: true,
    onCreateServiceClick: () => undefined,
  },
};
export const AuthenticatedEditMode: Story = {
  args: {
    services,
    isEditModeEnabled: true,
    isAuthenticated: true,
    profileName: 'Emma Smith',
    profileImageSrc: '/images/user-logo.png',
    onCreateServiceClick: () => undefined,
  },
};
