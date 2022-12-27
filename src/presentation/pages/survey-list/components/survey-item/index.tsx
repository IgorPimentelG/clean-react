import React from 'react'
import styles from './styles.scss'
import { Icon, IconName } from '@/presentation/components'

const SurveyItem: React.FC = () => {
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon
          iconName={IconName.thumbDown}
          className={styles.icon}
        />
        <time>
          <span className={styles.day}>25</span>
          <span className={styles.month}>12</span>
          <span className={styles.year}>2022</span>
        </time>
        <p>Qual é o seu framework web favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export { SurveyItem }
