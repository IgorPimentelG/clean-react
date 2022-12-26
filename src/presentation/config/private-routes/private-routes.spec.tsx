import React from 'react'
import { render } from '@testing-library/react'
import { PrivateRoutes } from './private-routes'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { APIContext } from '@/presentation/context'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <APIContext.Provider
      value={{
        getCurrentAccount: () => account
      }}
    >
      <Router
        location={history.location}
        navigator={history}
      >
        <PrivateRoutes>
        </PrivateRoutes>
      </Router>
    </APIContext.Provider>
  )

  return {
    history
  }
}

describe('PrivateRoutes', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should render current component if token is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
