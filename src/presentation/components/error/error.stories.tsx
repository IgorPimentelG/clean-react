import { Meta, StoryObj } from '@storybook/react'
import { Error } from '@/presentation/components'

type Props = {
  error: string
  reload: () => void
}

export default {
  title: 'Survey/SurveyError',
  component: Error,
  args: {
    error: 'Parece que algo deu errado. Tente novamente em breve.'
  },
  argTypes: {
    error: {
      description: 'Error message displayed'
    },
    reload: {
      description: 'Function to reload the data',
      control: { type: null }
    }
  }
} as Meta

export const Default: StoryObj<Props> = {}
