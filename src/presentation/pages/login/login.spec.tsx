import React from 'react'
import faker from 'faker'
import { Authentication } from '@/domain/usecases'
import { APIContext } from '@/presentation/context'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Login } from '@/presentation/pages'
import { RecoilRoot } from 'recoil'
import { InvalidCredentailsError } from '@/domain/errors'
import {
  ValidationStub,
  AuthenticationSpy,
  Helper
} from '@/presentation/test'
import {
  fireEvent,
  render,
  waitFor,
  screen
} from '@testing-library/react'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrectAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrectAccountMock = jest.fn()
  validationStub.errorMessage = params?.validationError
  render(
    <RecoilRoot>
      <APIContext.Provider
        value={{
          setCurrentAccount: setCurrectAccountMock
        }}
      >
        <Router
          location={history.location}
          navigator={history}
        >
          <Login
            validation={validationStub}
            authentication={authenticationSpy}
          />
        </Router>
      </APIContext.Provider>
    </RecoilRoot>
  )
  return {
    authenticationSpy,
    setCurrectAccountMock
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    Helper.populateField('email')
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should preset error if Authentication falls', async () => {
    const { authenticationSpy } = makeSut()
    const errorMessage = new InvalidCredentailsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(errorMessage)
    await simulateValidSubmit()
    await waitFor(async () => {
      const mainError = await screen.getByTestId('error')
      expect(mainError.textContent).toBe(errorMessage.message)
      Helper.testChildCount('error-wrap', 1)
    })
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrectAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrectAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.location.pathname).toBe('/survey-list')
  })

  test('Should go to signup page', () => {
    makeSut()
    const register = screen.getByTestId('signup-link')
    fireEvent.click(register)
    expect(history.location.pathname).toBe('/signup')
  })
})
