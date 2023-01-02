import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyContext } from '@/presentation/context'
import { useErrorHandler } from '@/presentation/hooks'
import { Header, Footer, Error } from '@/presentation/components'
import { SurveyItem, SurveyItemEmpty } from './components'

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

  function reload (): void {
    setState(old => ({ ...old, reload: true }))
  }

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error
            ? (
              <Error
                error={state.error}
                reload={reload}
              />
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
