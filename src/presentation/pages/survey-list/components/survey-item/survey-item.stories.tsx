import { Meta, StoryObj } from '@storybook/react'
import { LoadSurveyList } from '@/domain/usecases'
import { mockSurveyList } from '@/domain/test'
import { SurveyItem } from '@/presentation/pages/survey-list/components'

type Props = {
  survey: LoadSurveyList.Model
}

export default {
  title: 'Survey/SurveyItem',
  component: SurveyItem,
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
