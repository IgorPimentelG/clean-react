import React from 'react'

import styles from './styles.module.scss'
import { Spinner } from '../spinner'

type Props = {
  state: any
}

const FormStatus: React.FC<Props> = ({ state }) => {
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && <Spinner className={styles.spinner}/>}
      {state.error && <span data-testid="error" className={styles.error}>{state.error}</span>}
    </div>
  )
}

export { FormStatus }
