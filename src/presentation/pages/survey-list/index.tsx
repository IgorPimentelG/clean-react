import { Header, Footer, Icon, IconName } from '@/presentation/components'
import React from 'react'
import styles from './styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
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
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
