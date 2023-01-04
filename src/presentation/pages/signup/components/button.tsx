import React from 'react'
import { SubmitButton as SubmitButtonBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import { signUpState } from '../atoms'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }) => {
  const [state] = useRecoilState(signUpState)
  return (
    <SubmitButtonBase text={text} state={state} />
  )
}

export { SubmitButton }
