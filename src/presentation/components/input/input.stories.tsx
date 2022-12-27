import React from 'react'
import { Input } from '.'
import { ComponentMeta, Story } from '@storybook/react'

export default {
  title: 'Inputs/Input',
  component: Input
} as ComponentMeta<typeof Input>

export const Primary: Story = (args) => (
  <Input {...args} />
)
