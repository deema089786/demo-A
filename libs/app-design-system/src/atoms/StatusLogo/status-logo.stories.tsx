import type { Meta, StoryObj } from '@storybook/react';

import { StatusLogo } from './status-logo.component';

const meta: Meta<typeof StatusLogo> = {
  component: StatusLogo,
  title: 'Atoms/Status Logo',
};
export default meta;
type Story = StoryObj<typeof StatusLogo>;

export const Active: Story = {
  args: {
    variant: 'active',
  },
};
export const Archived: Story = {
  args: {
    variant: 'archived',
  },
};
export const Draft: Story = {
  args: {
    variant: 'draft',
  },
};
export const Deleted: Story = {
  args: {
    variant: 'deleted',
  },
};
