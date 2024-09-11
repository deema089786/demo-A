import type { Meta, StoryObj } from '@storybook/react';

import { ServicePriceInput } from './service-price-input.component';

const meta: Meta<typeof ServicePriceInput> = {
  component: ServicePriceInput,
  title: 'Molecules/Service Price Input',
};
export default meta;
type Story = StoryObj<typeof ServicePriceInput>;

export const Default: Story = {
  args: {},
};
