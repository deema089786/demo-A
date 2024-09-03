import type { Meta, StoryObj } from '@storybook/react';

import { CreatePasswordCard } from './create-password-card.component';

const meta: Meta<typeof CreatePasswordCard> = {
  component: CreatePasswordCard,
  title: 'Molecules/Create Password Card',
};
export default meta;
type Story = StoryObj<typeof CreatePasswordCard>;

export const Default: Story = {
  args: { onSubmit: () => undefined },
};
