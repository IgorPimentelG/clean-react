import React, { useContext, useRef } from 'react'
import Styles from './styles.scss'
import Context from '@/presentation/context/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  function handleChange (event: React.FocusEvent<HTMLInputElement, Element>): void {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        readOnly
        title={error}
        onChange={handleChange}
        onFocus={(event) => { event.target.readOnly = false }}
      />
      <label
        onClick={() => inputRef.current.focus()}
        title={error}
        data-testid={`${props.name}-label`}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export { Input }
