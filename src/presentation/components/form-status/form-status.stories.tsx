import { Meta, StoryObj } from '@storybook/react'
import { withReactContext } from 'storybook-react-context'
import { FormContext } from '@/presentation/context'
import { FormStatus } from '@/presentation/components'

export default {
  title: 'Components/FormStatus',
  component: FormStatus
} as Meta

export const Default: StoryObj = {
  decorators: [
    withReactContext({
      Context: FormContext,
      initialState: {
        state: {
          isLoading: false,
          error: ''
        }
      }
    })
  ]
}

export const Loading: StoryObj = {
  decorators: [
    withReactContext({
      Context: FormContext,
      initialState: {
        state: {
          isLoading: true,
          error: ''
        }
      }
    })
  ]
}

export const Error: StoryObj = {
  decorators: [
    withReactContext({
      Context: FormContext,
      initialState: {
        state: {
          isLoading: false,
          error: 'Credenciais Inválidas'
        }
      }
    })
  ]
}
