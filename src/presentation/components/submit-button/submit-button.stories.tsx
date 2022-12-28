import { Meta, StoryObj } from '@storybook/react'
import { SubmitButton } from '@/presentation/components'
import { withReactContext } from 'storybook-react-context'
import { FormContext } from '@/presentation/context'

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

export const Default: StoryObj<Props> = {
  decorators: [withReactContext({
    Context: FormContext,
    initialState: { state: { isFormInvalid: false } }
  })]
}

export const Enabled: StoryObj<Props> = {
  args: {
    text: 'Enabled'
  },
  decorators: [withReactContext({
    Context: FormContext,
    initialState: { state: { isFormInvalid: false } }
  })]
}

export const Disabled: StoryObj<Props> = {
  args: {
    text: 'Disabled'
  },
  decorators: [withReactContext({
    Context: FormContext,
    initialState: { state: { isFormInvalid: true } }
  })]
}
