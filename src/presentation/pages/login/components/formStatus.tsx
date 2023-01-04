import React from 'react'
import { FormStatus as FormStatusBase } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import { loginState } from '../atoms'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(loginState)
  return (
    <FormStatusBase state={state} />
  )
}

export { FormStatus }
