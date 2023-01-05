import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import styles from './styles.module.scss'
import { surveyResultState, onSurveyAnswerState } from './atom'
import { SurveyResultData } from './components'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { Header, Footer, Loading, Error } from '@/presentation/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message, surveyResult: null, isLoading: false })
  })

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

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
    if (!state.isLoading) {
      setState(({ ...state, isLoading: true }))
      saveSurveyResult.save({ answer })
        .then((surveyResult) => {
          setState(old => ({ ...old, isLoading: false, surveyResult }))
        })
        .catch(handleError)
    }
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
