import { SurveyList } from '@/presentation/pages'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { createMemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'
import { renderWithHistory } from '@/presentation/test'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => SurveyList({ loadSurveyList: loadSurveyListSpy })
  })

  return {
    loadSurveyListSpy,
    setCurrentAccountMock
  }
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    await waitFor(() => {
      const surveyList = screen.getByTestId('survey-list')
      expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    })
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    await waitFor(() => {
      expect(loadSurveyListSpy.callsCount).toBe(1)
    })
  })

  test('Should render SurveyItems on success', async () => {
    makeSut()
    await waitFor(() => {
      const surveyList = screen.getByTestId('survey-list')
      expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(1)
    })
  })

  test('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    })
  })

  test('Should call LoadSurveyList on realod', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('reload'))
      expect(loadSurveyListSpy.callsCount).toBe(1)
    })
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock } = makeSut(loadSurveyListSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })
  })
})
