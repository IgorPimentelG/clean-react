import React from 'react'
import { SignUp } from '@/presentation/pages'
import {
  makeLocalUpdateCurrentAccount
} from '@/main/factories/useCases/update-current-account/local-update-current-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../useCases/authentication/remote-add-account-factory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      validation={makeSignUpValidation()}
      addAccount={makeRemoteAddAccount()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
