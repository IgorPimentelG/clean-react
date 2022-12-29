import React from 'react'
import styles from './styles.module.scss'

const SurveyItemEmpty: React.FC = () => {
  return (
    <>
      <li className={styles.surveyItemEmpty}></li>
      <li className={styles.surveyItemEmpty}></li>
      <li className={styles.surveyItemEmpty}></li>
      <li className={styles.surveyItemEmpty}></li>
    </>
  )
}

export { SurveyItemEmpty }
