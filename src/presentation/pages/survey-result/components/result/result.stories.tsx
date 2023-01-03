import { Meta, StoryObj } from '@storybook/react'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { mockSurveyResult } from '@/domain/test'
import { withRouter } from 'storybook-addon-react-router-v6'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

export default {
  title: 'Survey/SurveyResult',
  component: SurveyResultData,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routerPath: '/survey/:id',
      routeParams: { id: '1' }
    }
  },
  args: {
    surveyResult: mockSurveyResult()
  },
  argsTypes: {
    surveyResult: {
      description: 'Survey result to be displayed',
      type: 'SurveyResult'
    }
  }
} as Meta

export const Default: StoryObj<Props> = {}
