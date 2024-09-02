import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button.component';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Atoms/Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const PrimarySmall: Story = {
  args: {
    color: 'primary',
    size: 'small',
    children: 'Button text',
  },
};
export const PrimaryMedium: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    children: 'Button text',
  },
};
export const PrimaryLarge: Story = {
  args: {
    color: 'primary',
    size: 'large',
    children: 'Button text',
  },
};

export const SecondarySmall: Story = {
  args: {
    color: 'secondary',
    size: 'small',
    children: 'Button text',
  },
};
export const SecondaryMedium: Story = {
  args: {
    color: 'secondary',
    size: 'medium',
    children: 'Button text',
  },
};
export const SecondaryLarge: Story = {
  args: {
    color: 'secondary',
    size: 'large',
    children: 'Button text',
  },
};

////////

export const PrimaryOutlinedSmall: Story = {
  args: {
    color: 'primary',
    size: 'small',
    children: 'Button text',
    variant: 'outlined',
  },
};
export const PrimaryOutlinedMedium: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    children: 'Button text',
    variant: 'outlined',
  },
};
export const PrimaryOutlinedLarge: Story = {
  args: {
    color: 'primary',
    size: 'large',
    children: 'Button text',
    variant: 'outlined',
  },
};

export const SecondaryOutlinedSmall: Story = {
  args: {
    color: 'secondary',
    size: 'small',
    children: 'Button text',
    variant: 'outlined',
  },
};
export const SecondaryOutlinedMedium: Story = {
  args: {
    color: 'secondary',
    size: 'medium',
    children: 'Button text',
    variant: 'outlined',
  },
};
export const SecondaryOutlinedLarge: Story = {
  args: {
    color: 'secondary',
    size: 'large',
    children: 'Button text',
    variant: 'outlined',
  },
};

//////

export const PrimaryContainedSmall: Story = {
  args: {
    color: 'primary',
    size: 'small',
    children: 'Button text',
    variant: 'contained',
  },
};
export const PrimaryContainedMedium: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    children: 'Button text',
    variant: 'contained',
  },
};
export const PrimaryContainedLarge: Story = {
  args: {
    color: 'primary',
    size: 'large',
    children: 'Button text',
    variant: 'contained',
  },
};

export const SecondaryContainedSmall: Story = {
  args: {
    color: 'secondary',
    size: 'small',
    children: 'Button text',
    variant: 'contained',
  },
};
export const SecondaryContainedMedium: Story = {
  args: {
    color: 'secondary',
    size: 'medium',
    children: 'Button text',
    variant: 'contained',
  },
};
export const SecondaryContainedLarge: Story = {
  args: {
    color: 'secondary',
    size: 'large',
    children: 'Button text',
    variant: 'contained',
  },
};
