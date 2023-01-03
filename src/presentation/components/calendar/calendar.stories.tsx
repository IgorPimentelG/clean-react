import { Calendar } from '@/presentation/components'
import { Meta, StoryObj } from '@storybook/react'

type Props = {
  date: Date
  className?: string
}

export default {
  title: 'Components/Calendar',
  component: Calendar,
  args: {
    date: new Date()
  },
  argTypes: {
    date: {
      description: 'Date displayed'
    },
    className: {
      description: 'Styles outside the component',
      control: { type: null }
    }
  }
} as Meta

export const Default: StoryObj<Props> = {}
