import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { Spinner } from '../spinner'
import Context from '@/presentation/context/form/form-context'

const FormStatus: React.FC = () => {
  const { isLoading, error } = useContext(Context).state
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner}/>}
      {error && <span data-testid="error" className={styles.error}>{error}</span>}
    </div>
  )
}

export { FormStatus }
