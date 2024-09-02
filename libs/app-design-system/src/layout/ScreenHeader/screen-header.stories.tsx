import type { Meta, StoryObj } from '@storybook/react';

import { ScreenHeader } from './screen-header.component';

const meta: Meta<typeof ScreenHeader> = {
  component: ScreenHeader,
  title: 'Layout/Screen Header',
};
export default meta;
type Story = StoryObj<typeof ScreenHeader>;

export const Default: Story = {
  args: {},
};
