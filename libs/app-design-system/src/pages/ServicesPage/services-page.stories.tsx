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
    description: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
  },
  {
    id: '2',
    variant: 'banner',
    title: 'Sea Food',
    description: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
  },
  {
    id: '3',
    variant: 'default',
    title: 'Sea Food',
    description: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
  },
  {
    id: '4',
    variant: 'default',
    title: 'Sea Food',
    description: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
  },
  {
    id: '5',
    variant: 'default',
    title: 'Sea Food',
    description: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
  },
];

export const Default: Story = {
  args: {
    services,
    editModeEnabled: false,
  },
};
export const EditMode: Story = {
  args: {
    services,
    editModeEnabled: true,
  },
};
export const NoServices: Story = {
  args: {
    services: [],
    editModeEnabled: true,
  },
};
