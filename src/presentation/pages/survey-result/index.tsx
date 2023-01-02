import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import FlipMove from 'react-flip-move'
import { LoadSurveyResult } from '@/domain/usecases'
import { Header, Footer, Loading, Calendar, Error } from '@/presentation/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then()
      .catch()
  }, [])

  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={styles.calendarWrap} />
              <h2>Qual é seu framework web favorito?</h2>
            </hgroup>
            <FlipMove className={styles.answersList}>
              <li>
                <img src="" />
                <span className={styles.answer}>ReactJS</span>
                <span className={styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>

            {state.isLoading && <Loading />}
            {state.error && <Error error={state.error} reload={() => {}} />}
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export { SurveyResult }
