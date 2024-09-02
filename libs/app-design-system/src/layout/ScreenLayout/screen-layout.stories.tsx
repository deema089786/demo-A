import type { Meta, StoryObj } from '@storybook/react';

import { ScreenLayout } from './screen-layout.component';

const meta: Meta<typeof ScreenLayout> = {
  component: ScreenLayout,
  title: 'Layout/Screen Layout',
};
export default meta;
type Story = StoryObj<typeof ScreenLayout>;

export const Default: Story = {
  args: {},
};
