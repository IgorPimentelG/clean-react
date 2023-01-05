import React, { useRef } from 'react'
import { SetterOrUpdater } from 'recoil'

import styles from './styles.module.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  state: any
  setState: SetterOrUpdater<any>
}

const Input: React.FC<Props> = ({ state, setState, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
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
      className={styles.inputWrap}
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
