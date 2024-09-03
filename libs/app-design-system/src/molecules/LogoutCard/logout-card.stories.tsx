import type { Meta, StoryObj } from '@storybook/react';

import { LogoutCard } from './logout-card.component';

const meta: Meta<typeof LogoutCard> = {
  component: LogoutCard,
  title: 'Molecules/Logout Card',
};
export default meta;
type Story = StoryObj<typeof LogoutCard>;

export const Default: Story = {
  args: { onLogoutClick: () => undefined },
};
