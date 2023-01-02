import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { LoadSurveyResult } from '@/domain/usecases'
import { Header, Footer, Loading, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from './components'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message, surveyResult: null }))
  })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then((surveyResult) => {
        setState(old => ({ ...old, surveyResult }))
      })
      .catch(handleError)
  }, [state.reload])

  function reload (): void {
    setState(old => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }))
  }

  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult}/>}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export { SurveyResult }
