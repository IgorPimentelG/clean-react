import React from 'react'
import { RecoilRoot } from 'recoil'
import { Router } from 'react-router-dom'
import { MemoryHistory } from 'history'
import { currentAccountState } from '@/presentation/shared/atoms'
import { render } from '@testing-library/react'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

type Params = {
  Page: React.FC
  history: MemoryHistory
  account?: AccountModel
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

const renderWithHistory = ({ Page, history, account = mockAccountModel() }: Params): Result => {
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
        <Page />
      </Router>
    </RecoilRoot>
  )

  return {
    setCurrentAccountMock
  }
}

export { renderWithHistory }
