import type { Meta, StoryObj } from '@storybook/react';

import { Paper } from './paper.component';

const meta: Meta<typeof Paper> = {
  component: Paper,
  title: 'Atoms/Paper',
};
export default meta;
type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  args: {
    children: 'Paper Default',
  },
  render: (props) => (
    <div style={{ width: 200 }}>
      <Paper {...props} />
    </div>
  ),
};
export const Square: Story = {
  args: {
    square: true,
    children: 'Paper Square',
  },
  render: (props) => (
    <div style={{ width: 200 }}>
      <Paper {...props} />
    </div>
  ),
};
