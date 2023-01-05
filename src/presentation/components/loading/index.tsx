import React from 'react'

import styles from './styles.module.scss'
import { Spinner } from '@/presentation/components'

const Loading: React.FC = () => {
  return (
    <div data-testid="loading" className={styles.loadingWrap}>
      <div className={styles.loading}>
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}

export { Loading }
