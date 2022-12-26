import React from 'react'
import faker from 'faker'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Login } from '@/presentation/pages'
import { InvalidCredentailsError } from '@/domain/errors'
import {
  ValidationStub,
  AuthenticationSpy,
  UpdateCurrentAccountMock,
  Helper
} from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const updateCurrentAccountMock = new UpdateCurrentAccountMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router
      location={history.location}
      navigator={history}
    >
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    updateCurrentAccountMock
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should preset error if Authentication falls', async () => {
    const { sut, authenticationSpy } = makeSut()
    const errorMessage = new InvalidCredentailsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(errorMessage)
    await simulateValidSubmit(sut)
    await waitFor(async () => {
      const mainError = await sut.getByTestId('error')
      expect(mainError.textContent).toBe(errorMessage.message)
      Helper.testChildCount(sut, 'error-wrap', 1)
    })
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { sut, authenticationSpy, updateCurrentAccountMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(updateCurrentAccountMock.account).toEqual(authenticationSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  test('Should preset error if SaveAccessToken fails', async () => {
    const { sut, updateCurrentAccountMock } = makeSut()
    const errorMessage = new InvalidCredentailsError()
    jest.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(errorMessage)
    await simulateValidSubmit(sut)
    await waitFor(async () => {
      const mainError = await sut.getByTestId('error')
      expect(mainError.textContent).toBe(errorMessage.message)
      Helper.testChildCount(sut, 'error-wrap', 1)
    })
  })

  test('Should go to signup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')
    fireEvent.click(register)
    expect(history.location.pathname).toBe('/signup')
  })
})
