import type { Meta, StoryObj } from '@storybook/react';

import { AddServiceCard } from './add-service-card.component';

const meta: Meta<typeof AddServiceCard> = {
  component: AddServiceCard,
  title: 'Molecules/Add Service Card',
};
export default meta;
type Story = StoryObj<typeof AddServiceCard>;

export const Default: Story = {
  args: {
    variant: 'default',
    onClick: () => undefined,
  },
};

export const Banner: Story = {
  args: {
    variant: 'banner',
    onClick: () => undefined,
  },
};
