import type { Meta, StoryObj } from '@storybook/react';

import { ServiceCard } from './service-card.component';

const meta: Meta<typeof ServiceCard> = {
  component: ServiceCard,
  title: 'Molecules/Service Card',
};
export default meta;
type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'Sea Food',
    description: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
  },
};

export const Banner: Story = {
  args: {
    variant: 'banner',
    title: 'Sea Food',
    description: 'Food service with delivering fresh sea food',
    imageSrc: '/images/service-card-banner-image.jpg',
  },
};
