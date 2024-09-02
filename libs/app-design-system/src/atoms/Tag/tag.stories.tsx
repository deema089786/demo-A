import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from './tag.component';

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'Atoms/Tag',
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Primary',
  },
};
export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary',
  },
};
export const Info: Story = {
  args: {
    color: 'info',
    children: 'Info',
  },
};
export const Warning: Story = {
  args: {
    color: 'warning',
    children: 'Warning',
  },
};
export const Success: Story = {
  args: {
    color: 'success',
    children: 'Success',
  },
};
