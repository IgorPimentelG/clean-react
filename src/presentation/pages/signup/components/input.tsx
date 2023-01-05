import React from 'react'
import { useRecoilState } from 'recoil'

import { signUpState } from '../atoms'
import { Input as InputBase } from '@/presentation/components'

type Props = {
  type: string
  name: string
  placeholder: string
}

const Input: React.FC<Props> = ({ type, name, placeholder }) => {
  const [state, setState] = useRecoilState(signUpState)
  return (
    <InputBase
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  )
}

export { Input }
