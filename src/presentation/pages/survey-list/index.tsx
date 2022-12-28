import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Header, Footer } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { SurveyContext } from '@/presentation/context'
import { SurveyError, SurveyItem, SurveyItemEmpty } from './components'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => {
        setState({ ...state, surveys })
      }).catch((error) => {
        setState({ ...state, error: error.message })
      })
  }, [state.reload])

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
                  : <SurveyItemEmpty />
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
