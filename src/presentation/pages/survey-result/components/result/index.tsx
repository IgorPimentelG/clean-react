import React, { useState, useEffect } from 'react'
import FlipMove from 'react-flip-move'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import styles from './styles.module.scss'
import { onSurveyAnswerState } from '../../atom'
import { Calendar } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultAnswerModel } from '@/domain/models'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const SurveyResultData: React.FC<Props> = ({ surveyResult }: Props) => {
  const navigate = useNavigate()
  const { onAnswer } = useRecoilValue(onSurveyAnswerState)
  const [goBack, setGoBack] = useState(false)

  useEffect(() => {
    if (goBack) {
      navigate(-1)
    }
  }, [goBack])

  function changeAnswer (event: React.MouseEvent, answer: SurveyResultAnswerModel): void {
    if (!event.currentTarget.classList.contains(styles.active)) {
      onAnswer(answer.answer)
    }
  }

  return (
    <>
      <hgroup className={styles.hgroup}>
        <Calendar date={surveyResult.date} className={styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>

      <FlipMove data-testid="answers" className={styles.answersList}>
        {surveyResult.answers.map((answer, index) => (
          <li
            key={index}
            data-testid="answer-wrap"
            className={answer.isCurrentAccountAnswer ? styles.active : ''}
            onClick={(event) => changeAnswer(event, answer)}
          >
            {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
            <span data-testid="answer" className={styles.answer}>{answer.answer}</span>
            <span data-testid="percent" className={styles.percent}>{answer.percent}%</span>
          </li>
        ))}
      </FlipMove>

      <button
        className={styles.button}
        data-testid="back-button"
        onClick={() => setGoBack(!goBack)}
      >
        Voltar
      </button>
    </>
  )
}

export { SurveyResultData }
