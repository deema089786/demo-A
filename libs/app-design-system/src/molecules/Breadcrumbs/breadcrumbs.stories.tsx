import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from './breadcrumbs.component';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  title: 'Molecules/Breadcrumbs',
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {},
};
