import React from 'react'
import { FormStatus as FormStatusBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import { signUpState } from '../atoms'

const FormStatus: React.FC = () => {
  const [state] = useRecoilState(signUpState)
  return (
    <FormStatusBase state={state} />
  )
}

export { FormStatus }
