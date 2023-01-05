import React from 'react'
import { Header } from '@/presentation/components'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { RecoilRoot } from 'recoil'
import { currentAccountState } from '@/presentation/shared/atoms'

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, {
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => account
    })}>
      <Router
        location={history.location}
        navigator={history}
      >
        <Header />
      </Router>
    </RecoilRoot>
  )

  return {
    setCurrentAccountMock
  }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const { setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
