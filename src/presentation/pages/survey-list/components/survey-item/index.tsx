import React from 'react'
import styles from './styles.module.scss'
import { Calendar, Icon, IconName } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { Link } from 'react-router-dom'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }) => {
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon
          iconName={survey.didAnswer ? IconName.thumbUp : IconName.thumbDown}
          className={styles.icon}
        />
        <Calendar date={survey.date} className={styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>
        <Link data-testid="link" to={`/survey/${survey.id}`}>Ver Resultado</Link>
      </footer>
    </li>
  )
}

export { SurveyItem }
