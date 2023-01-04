import React from 'react'
import { SubmitButton as SubmitButtonBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import { loginState } from '../atoms'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const [state] = useRecoilState(loginState)
  return (
    <SubmitButtonBase text={text} state={state} />
  )
}

export { SubmitButton }
