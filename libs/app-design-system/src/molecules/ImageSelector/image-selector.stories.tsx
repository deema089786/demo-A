import type { Meta, StoryObj } from '@storybook/react';

import { ImageSelector } from './image-selector.component';

const meta: Meta<typeof ImageSelector> = {
  component: ImageSelector,
  title: 'Molecules/Image Selector',
};
export default meta;
type Story = StoryObj<typeof ImageSelector>;

export const Selected: Story = {
  args: {
    src: '/images/service-card-banner-image.jpg',
    onClearClick: () => undefined,
    onSelectClick: () => undefined,
  },
};

export const NotSelected: Story = {
  args: {
    src: null,
    onClearClick: () => undefined,
    onSelectClick: () => undefined,
  },
};
