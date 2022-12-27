import React from 'react'
import { Router } from 'react-router-dom'
import { SignUp } from '.'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { APIContext } from '@/presentation/context'
import { EmailInUseError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import {
  Helper,
  ValidationStub,
  AddAccountSpy
} from '@/presentation/test'
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react'

const history = createMemoryHistory({ initialEntries: ['/login'] })

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrectAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  await waitFor(async () => {
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
  })
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const setCurrectAccountMock = jest.fn()
  validationStub.errorMessage = params?.validationError
  render(
    <APIContext.Provider
      value={{
        setCurrentAccount: setCurrectAccountMock
      }}
    >
      <Router
        location={history.location}
        navigator={history}
      >
        <SignUp
          validation={validationStub}
          addAccount={addAccountSpy}
        />
      </Router>
    </APIContext.Provider>
  )

  return {
    addAccountSpy,
    setCurrectAccountMock
  }
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  test('Should email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('name')
    Helper.testStatusForField('name')
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name, email, password, passwordConfirmation: password
    })
  })

  test('Shoudl call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Shoudl not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit()
    await waitFor(async () => {
      const mainError = await screen.getByTestId('error')
      expect(mainError.textContent).toBe(error.message)
      Helper.testChildCount('error-wrap', 1)
    })
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrectAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrectAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should go to login page', () => {
    makeSut()
    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)
    expect(history.location.pathname).toBe('/login')
  })
})
