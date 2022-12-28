import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Header, Footer } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyError, SurveyItem, SurveyItemEmpty } from './components'
import { SurveyModel } from '@/domain/models'
import { SurveyContext } from '@/presentation/context'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => {
        setState({ ...state, surveys })
      }).catch((error) => {
        setState({ ...state, error: error.message })
      })
  }, [])

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error
            ? (
              <SurveyError />
            ) : (
              <ul data-testid="survey-list">
                {state.surveys.length
                  ? state.surveys.map((survey: SurveyModel) =>
                    <SurveyItem key={survey.id} survey={survey}/>
                  )
                  : (<SurveyItemEmpty />)
                }
              </ul>
            )
          }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
