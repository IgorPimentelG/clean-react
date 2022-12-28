import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { Spinner } from '../spinner'
import { FormContext } from '@/presentation/context'

const FormStatus: React.FC = () => {
  const { isLoading, error } = useContext(FormContext).state
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner}/>}
      {error && <span data-testid="error" className={styles.error}>{error}</span>}
    </div>
  )
}

export { FormStatus }
