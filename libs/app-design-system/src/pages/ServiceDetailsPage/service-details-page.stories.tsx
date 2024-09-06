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
    service: {
      id: '1',
      variant: 'banner',
      title: 'Sea Food',
      description: 'Food service with delivering fresh sea food',
      imageSrc: '/images/service-card-banner-image.jpg',
    },
  },
};
