import React from 'react'
import { useRecoilValue } from 'recoil'

import { loginState } from '../atoms'
import { SubmitButton as SubmitButtonBase } from '@/presentation/components'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const state = useRecoilValue(loginState)
  return (
    <SubmitButtonBase text={text} state={state} />
  )
}

export { SubmitButton }
