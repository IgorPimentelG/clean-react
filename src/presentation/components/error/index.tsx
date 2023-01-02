import React, { useContext } from 'react'
import styles from './styles.module.scss'

type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }) => {
  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button data-testid="reload" onClick={reload}>
        Tentar novamente
      </button>
    </div>
  )
}

export { Error }
