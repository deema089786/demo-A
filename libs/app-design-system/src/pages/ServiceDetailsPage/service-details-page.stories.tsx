import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';

import { ServiceDetailsPage } from './service-details-page.component';

const meta: Meta<typeof ServiceDetailsPage> = {
  decorators: [withRouter],
  component: ServiceDetailsPage,
  title: 'Pages/Service Details Page',
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof ServiceDetailsPage>;

export const Default: Story = {
  args: {
    serviceTitle: 'Sea Food',
    serviceDescription: 'Food service with delivering fresh sea food',
    serviceImageSrc: '/images/service-card-banner-image.jpg',
  },
};
