import { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/presentation/components'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default {
  title: 'Components/Input',
  component: Input
} as Meta

export const Default: StoryObj<Props> = {
  args: {
    placeholder: 'Default Input',
    type: 'text'
  },
  argTypes: {
    type: {
      description: 'Define the type of input',
      control: 'inline-radio',
      options: ['text', 'number', 'email', 'password'],
      defaultValue: 'text'
    }
  }
}

export const Valid: StoryObj<Props> = {
  args: {
    name: 'email',
    placeholder: 'Digite o seu e-mail',
    value: 'any@email.com'
  }
}

export const Invalid: StoryObj<Props> = {
  args: {
    name: 'email',
    placeholder: 'Digite o seu e-mail',
    value: 'invalid_mail'
  }
}
