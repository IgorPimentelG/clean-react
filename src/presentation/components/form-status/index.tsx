import React, { useContext } from 'react'
import Styles from './styles.scss'
import { Spinner } from '../spinner'
import Context from '@/presentation/context/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, error } = useContext(Context).state
  return (
    <div data-testId="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner}/>}
      {error && <span className={Styles.error}>{error}</span>}
    </div>
  )
}

export { FormStatus }
