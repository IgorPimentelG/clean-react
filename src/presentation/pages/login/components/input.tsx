import React from 'react'
import { Input as InputBase } from '@/presentation/components'
import { useRecoilState } from 'recoil'
import { loginState } from '../atoms'

type Props = {
  type: string
  name: string
  placeholder: string
}

const Input: React.FC<Props> = ({ type, name, placeholder }) => {
  const [state, setState] = useRecoilState(loginState)
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
