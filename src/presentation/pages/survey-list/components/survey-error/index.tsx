import React, { useContext } from 'react'
import styles from './styles.scss'
import { SurveyContext } from '@/presentation/context'

const SurveyError: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export { SurveyError }
