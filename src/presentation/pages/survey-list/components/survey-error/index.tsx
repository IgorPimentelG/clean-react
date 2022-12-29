import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { SurveyContext } from '@/presentation/context'

const SurveyError: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)

  function reload (): void {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div className={styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload" onClick={reload}>
        Tentar novamente
      </button>
    </div>
  )
}

export { SurveyError }
