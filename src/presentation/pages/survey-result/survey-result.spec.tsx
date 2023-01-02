import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { render, screen, waitFor } from '@testing-library/react'
import { APIContext } from '@/presentation/context'
import { mockAccountModel, LoadSurveyResultSpy } from '@/domain/test'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  render(
    <APIContext.Provider
      value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}
    >
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </APIContext.Provider>
  )

  return {
    loadSurveyResultSpy
  }
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  test('Should call LoadSurvyeResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => {
      expect(loadSurveyResultSpy.callsCount).toBe(1)
    })
  })
})
