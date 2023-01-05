import { screen, waitFor, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { SurveyResult } from '@/presentation/pages'
import { renderWithHistory } from '@/presentation/test'
import { AccountModel } from '@/domain/models'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import {
  LoadSurveyResultSpy,
  mockSurveyResult,
  SaveSurveyResultSpy
} from '@/domain/test'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy
  saveSurveyResultSpy?: SaveSurveyResultSpy
}

const history = createMemoryHistory({ initialEntries: ['/survey-list', '/survey/any_id'], initialIndex: 1 })

const makeSut = ({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy()
}: SutParams = {}): SutTypes => {
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => SurveyResult({ loadSurveyResult: loadSurveyResultSpy, saveSurveyResult: saveSurveyResultSpy })
  })

  return {
    loadSurveyResultSpy,
    setCurrentAccountMock,
    saveSurveyResultSpy
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
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResult(), {
      date: new Date('2022-12-28T00:00:00')
    })
    loadSurveyResultSpy.surveyResult = surveyResult
    makeSut({ loadSurveyResultSpy })
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

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new AccessDeniedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    const { setCurrentAccountMock } = makeSut({ loadSurveyResultSpy })
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })
  })

  test('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    makeSut({ loadSurveyResultSpy })
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('reload'))
      expect(loadSurveyResultSpy.callsCount).toBe(1)
    })
  })

  test('Should go to SurveyList on back button click', async () => {
    makeSut()
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('back-button'))
      expect(history.location.pathname).toBe('/survey-list')
    })
  })

  test('Should not present Loading on active answer click', async () => {
    makeSut()
    await waitFor(() => {
      const answers = screen.queryAllByTestId('answer')
      fireEvent.click(answers[0])
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  test('Should call SaveSurveyResult on non active answer click', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    const answers = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answers[1])
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).toBeInTheDocument()
      expect(saveSurveyResultSpy.params).toEqual({
        answer: loadSurveyResultSpy.surveyResult.answers[1].answer
      })
    })
  })

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    loadSurveyResultSpy.surveyResult = mockSurveyResult()
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
    makeSut({ saveSurveyResultSpy, loadSurveyResultSpy })
    await waitFor(async () => {
      const answers = screen.queryAllByTestId('answer')
      fireEvent.click(answers[1])
    })
    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  test('Should logout on AccessDeniedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const error = new AccessDeniedError()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
    const { setCurrentAccountMock } = makeSut({ saveSurveyResultSpy })
    await waitFor(() => {
      const answers = screen.queryAllByTestId('answer')
      fireEvent.click(answers[1])
    })
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })
  })

  test('Should present SurveyResult data on SaveSurveyResult sucess', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResult(), {
      date: new Date('2022-12-28T00:00:00')
    })
    saveSurveyResultSpy.surveyResult = surveyResult
    makeSut({ saveSurveyResultSpy })
    await waitFor(() => {
      const answers = screen.queryAllByTestId('answer')
      fireEvent.click(answers[1])
    })
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
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  test('Should prevent multiple answer click', async () => {
    const { saveSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    const answers = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answers[1])
    await waitFor(() => screen.getByTestId('survey-result'))
    fireEvent.click(answers[1])
    expect(saveSurveyResultSpy.callsCount).toBe(1)
  })
})
