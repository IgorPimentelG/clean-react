import React from 'react'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen, fireEvent } from '@testing-library/react'
import { mockSurveyList } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { renderWithHistory } from '@/presentation/test'

type SutParams = {
  survey: LoadSurveyList.Model
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = ({ survey }: SutParams): void => {
  renderWithHistory({
    history,
    Page: () => SurveyItem({ survey })
  })
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyList()[0], {
      didAnswer: true,
      date: new Date('2022-12-28T00:00:00')
    })
    makeSut({ survey })
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('28')
    expect(screen.getByTestId('month')).toHaveTextContent('dez')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyList()[0], {
      didAnswer: false,
      date: new Date('2022-12-28T00:00:00')
    })
    makeSut({ survey })
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('28')
    expect(screen.getByTestId('month')).toHaveTextContent('dez')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  test('Should go to SurveyResult', () => {
    const survey = mockSurveyList()[0]
    makeSut({ survey })
    fireEvent.click(screen.getByTestId('link'))
    expect(history.location.pathname).toBe(`/survey/${survey.id}`)
  })
})
