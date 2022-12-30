import React from 'react'
import styles from './styles.module.scss'
import FlipMove from 'react-flip-move'
import { Header, Footer, Spinner } from '@/presentation/components'

const SurveyResult: React.FC = () => {
  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>
        <FlipMove className={styles.answersList}>
          <li>
            <img src="" />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        <div className={styles.loadingWrap}>
          <div className={styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyResult }
