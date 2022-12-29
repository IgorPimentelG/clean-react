import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Header, Footer } from '@/presentation/components'
import { SurveyError, SurveyItem, SurveyItemEmpty } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyContext } from '@/presentation/context'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
  })
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => {
        setState({ ...state, surveys })
      }).catch(handleError)
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
                  ? state.surveys.map((survey: LoadSurveyList.Model) =>
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
