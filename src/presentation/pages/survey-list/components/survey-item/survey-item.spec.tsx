import React from 'react'
import { SurveyItem } from '.'
import { render, screen } from '@testing-library/react'
import { mockSurveyList } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { SurveyModel } from '@/domain/models'

type SutParams = {
  survey: SurveyModel
}

const makeSut = ({ survey }: SutParams): void => {
  render(
    <SurveyItem survey={survey} />
  )
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyList()[0]
    survey.didAnswer = true
    survey.date = new Date('2022-12-28T00:00:00')
    makeSut({ survey })
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('28')
    expect(screen.getByTestId('month')).toHaveTextContent('dez')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  test('Should render with correct values', () => {
    const survey = mockSurveyList()[0]
    survey.didAnswer = false
    survey.date = new Date('2022-12-03T00:00:00')
    makeSut({ survey })
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('dez')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })
})
