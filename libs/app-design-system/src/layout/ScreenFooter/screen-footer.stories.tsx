import type { Meta, StoryObj } from '@storybook/react';

import { ScreenFooter } from './screen-footer.component';

const meta: Meta<typeof ScreenFooter> = {
  component: ScreenFooter,
  title: 'Layout/Screen Footer',
};
export default meta;
type Story = StoryObj<typeof ScreenFooter>;

export const Default: Story = {
  args: {},
};
