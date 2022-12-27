import React, { useEffect } from 'react'
import styles from './styles.scss'
import { Header, Footer } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyItemEmpty } from './components'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll()
    })()
  }, [])

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
