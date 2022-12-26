import React from 'react'
import { Login } from '@/presentation/pages'
import { makeLoginValidation } from './login-validation-factory'
import {
  makeRemoteAuthentication
} from '@/main/factories/useCases/authentication/remote-authentication-factory'
import {
  makeLocalUpdateCurrentAccount
} from '@/main/factories/useCases/update-current-account/local-update-current-account-factory'

export const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
