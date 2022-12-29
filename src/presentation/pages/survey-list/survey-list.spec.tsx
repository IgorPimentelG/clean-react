import React from 'react'
import { SurveyList } from '.'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list'
import { UnexpectedError } from '@/domain/errors'
import { APIContext } from '@/presentation/context'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(
    <APIContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>
      <Router
        location={history.location}
        navigator={history}
      >
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </APIContext.Provider>
  )

  return {
    loadSurveyListSpy
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

  test('Should render error on failure', async () => {
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
})
