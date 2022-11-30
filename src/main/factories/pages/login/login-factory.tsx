import React from 'react'
import { Login } from '@/presentation/pages'
import { makeLoginValidation } from './login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/useCases/authentication/remote-authentication-factory'

const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}

export { makeLogin }
