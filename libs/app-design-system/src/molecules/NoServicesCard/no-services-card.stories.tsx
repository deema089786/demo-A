import type { Meta, StoryObj } from '@storybook/react';

import { NoServicesCard } from './no-services-card.component';

const meta: Meta<typeof NoServicesCard> = {
  component: NoServicesCard,
  title: 'Molecules/No Services Card',
};
export default meta;
type Story = StoryObj<typeof NoServicesCard>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Banner: Story = {
  args: {
    variant: 'banner',
  },
};
