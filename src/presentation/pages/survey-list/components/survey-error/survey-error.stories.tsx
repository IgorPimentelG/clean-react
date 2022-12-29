import { Meta, StoryObj } from '@storybook/react'
import { SurveyError } from '@/presentation/pages/survey-list/components'
import { withReactContext } from 'storybook-react-context'
import { SurveyContext } from '@/presentation/context'

export default {
  title: 'Survey/SurveyError',
  component: SurveyError,
  decorators: [
    withReactContext({
      Context: SurveyContext,
      initialState: {
        state: {
          surveys: [],
          error: 'Algo de errado aconteceu. Tente novamente em breve',
          reload: false
        }
      }
    })
  ]
} as Meta

export const Default: StoryObj = {}
