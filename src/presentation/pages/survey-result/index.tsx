import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import FlipMove from 'react-flip-move'
import { LoadSurveyResult } from '@/domain/usecases'
import { Header, Footer, Loading, Calendar, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'

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
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={state.surveyResult.date} className={styles.calendarWrap} />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={styles.answersList}>
              {state.surveyResult.answers.map((answer, index) => (
                <li
                  data-testid="answer-wrap"
                  key={index}
                  className={answer.isCurrentAccountAnswer ? styles.active : ''}
                >
                  {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
                  <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
                  <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
                </li>
              ))}
            </FlipMove>
            <button>Voltar</button>
          </>
        )}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export { SurveyResult }
