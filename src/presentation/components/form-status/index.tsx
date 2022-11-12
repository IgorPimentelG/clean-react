import React, { useContext } from 'react'
import Styles from './styles.scss'
import { Spinner } from '../spinner'
import Context from '@/presentation/context/form/form-context'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  return (
    <div data-testId="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner}/>}
      {errorState.error && <span className={Styles.error}>{errorState.error}</span>}
    </div>
  )
}

export { FormStatus }
