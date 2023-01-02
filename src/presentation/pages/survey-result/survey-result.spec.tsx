import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { render, screen, waitFor } from '@testing-library/react'
import { APIContext } from '@/presentation/context'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import {
  mockAccountModel,
  LoadSurveyResultSpy,
  mockSurveyResult
} from '@/domain/test'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (surveyResult = mockSurveyResult()): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  loadSurveyResultSpy.surveyResult = surveyResult
  render(
    <Router
      location={history.location}
      navigator={history}
    >
      <APIContext.Provider
        value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}
      >
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </APIContext.Provider>
    </Router>
  )

  return {
    loadSurveyResultSpy
  }
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut()
    await waitFor(() => {
      const surveyResult = screen.getByTestId('survey-result')
      expect(surveyResult.childElementCount).toBe(0)
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  test('Should call LoadSurvyeResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => {
      expect(loadSurveyResultSpy.callsCount).toBe(1)
    })
  })

  test('Should present SurveyResult data on sucess', async () => {
    const surveyResult = Object.assign(mockSurveyResult(), {
      date: new Date('2022-12-28T00:00:00')
    })
    makeSut(surveyResult)
    await waitFor(() => {
      expect(screen.getByTestId('day')).toHaveTextContent('28')
      expect(screen.getByTestId('month')).toHaveTextContent('dez')
      expect(screen.getByTestId('year')).toHaveTextContent('2022')
      expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
      expect(screen.getByTestId('answers').childElementCount).toBe(2)
      const answerWrap = screen.queryAllByTestId('answer-wrap')
      expect(answerWrap[0]).toHaveClass('active')
      expect(answerWrap[1]).not.toHaveClass('active')
      const images = screen.queryAllByTestId('image')
      expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
      expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
      expect(images[1]).toBeFalsy()
      const answers = screen.queryAllByTestId('answer')
      expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
      expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
      const percents = screen.queryAllByTestId('percent')
      expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
      expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
    })
  })
})
