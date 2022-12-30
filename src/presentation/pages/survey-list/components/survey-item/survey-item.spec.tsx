import React from 'react'
import { SurveyItem } from '.'
import { render, screen } from '@testing-library/react'
import { mockSurveyList } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'

type SutParams = {
  survey: LoadSurveyList.Model
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
    makeSut({ survey })
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values', () => {
    const survey = mockSurveyList()[0]
    survey.didAnswer = false
    makeSut({ survey })
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
