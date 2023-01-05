import React from 'react'
import { useRecoilValue } from 'recoil'

import { signUpState } from '../atoms'
import { FormStatus as FormStatusBase } from '@/presentation/components'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(signUpState)
  return (
    <FormStatusBase state={state} />
  )
}

export { FormStatus }
