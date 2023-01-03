import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Header, Footer, Loading, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from './components'
import { SurveyResultContext } from '@/presentation/context'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message, surveyResult: null, isLoading: false }))
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

  function onAnswer (answer: string): void {
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then((surveyResult) => {
        setState(old => ({ ...old, isLoading: false, surveyResult }))
      })
      .catch(handleError)
  }

  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={styles.contentWrap}>
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult}/>}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export { SurveyResult }
