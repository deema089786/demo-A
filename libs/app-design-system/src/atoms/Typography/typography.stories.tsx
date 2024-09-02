import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from './typography.component';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'Atoms/Typography',
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const H1: Story = {
  args: {
    variant: 'h1',
    component: 'p',
    children: 'Typography H1 Text',
  },
};
export const H2: Story = {
  args: {
    variant: 'h2',
    component: 'p',
    children: 'Typography H2 Text',
  },
};
export const H3: Story = {
  args: {
    variant: 'h3',
    component: 'p',
    children: 'Typography H3 Text',
  },
};
export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    component: 'p',
    children: 'Typography Subtitle1 Text',
  },
};
export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    component: 'p',
    children: 'Typography Subtitle2 Text',
  },
};
export const Body1: Story = {
  args: {
    variant: 'body1',
    component: 'p',
    children: 'Typography Body1 Text',
  },
};
export const Body2: Story = {
  args: {
    variant: 'body2',
    component: 'p',
    children: 'Typography Body2 Text',
  },
};
export const Caption: Story = {
  args: {
    variant: 'caption',
    component: 'p',
    children: 'Typography Caption Text',
  },
};
