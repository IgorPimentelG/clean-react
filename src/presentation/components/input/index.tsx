import React, { useContext } from 'react'
import Styles from './styles.scss'
import Context from '@/presentation/context/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  function enableInput (event: React.FocusEvent<HTMLInputElement, Element>): void {
    event.target.readOnly = false
  }

  function handleChange (event: React.FocusEvent<HTMLInputElement, Element>): void {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function getStatus (): string {
    return error ? '🔴' : '🟢'
  }

  function getTitle (): string {
    return error || 'Tudo certo!'
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        data-testid={props.name}
        readOnly
        onChange={handleChange}
        onFocus={enableInput}
      />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  )
}

export { Input }
