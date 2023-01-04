import { Meta, StoryObj } from '@storybook/react'
import { SubmitButton } from '@/presentation/components'

type Props = {
  text: string
}

export default {
  title: 'Components/SubmitButton',
  component: SubmitButton,
  args: {
    text: 'Default'
  },
  argTypes: {
    text: {
      description: 'Button to send the data of a form'
    }
  }
} as Meta

export const Default: StoryObj<Props> = {}

export const Enabled: StoryObj<Props> = {
  args: {
    text: 'Enabled'
  }
}

export const Disabled: StoryObj<Props> = {
  args: {
    text: 'Disabled'
  }
}
