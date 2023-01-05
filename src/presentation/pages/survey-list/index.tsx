import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import styles from './styles.module.scss'
import { surveyListState } from './atom'
import { SurveyItem, SurveyItemEmpty } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { Header, Footer, Error } from '@/presentation/components'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useRecoilState(surveyListState)

  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
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
      </div>
      <Footer />
    </div>
  )
}

export { SurveyList }
