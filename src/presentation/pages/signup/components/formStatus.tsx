import React from 'react'
import { FormStatus as FormStatusBase } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import { signUpState } from '../atoms'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(signUpState)
  return (
    <FormStatusBase state={state} />
  )
}

export { FormStatus }
