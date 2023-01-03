import { Meta, StoryObj } from '@storybook/react'
import { LoadSurveyList } from '@/domain/usecases'
import { mockSurveyList } from '@/domain/test'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { withRouter } from 'storybook-addon-react-router-v6'

type Props = {
  survey: LoadSurveyList.Model
}

export default {
  title: 'Survey/SurveyItem',
  component: SurveyItem,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routerPath: '/survey-list'
    }
  },
  args: {
    survey: mockSurveyList()[0]
  },
  argTypes: {
    survey: {
      description: 'Survey to be displayed'
    }
  }
} as Meta

export const Default: StoryObj<Props> = {}

export const SurveyAlreadyAnswered: StoryObj<Props> = {
  args: {
    survey: {
      ...mockSurveyList()[0],
      didAnswer: true
    }
  }
}

export const SurveyWaitingToBeAnswered: StoryObj<Props> = {
  args: {
    survey: {
      ...mockSurveyList()[0],
      didAnswer: false
    }
  }
}
