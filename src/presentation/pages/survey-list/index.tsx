import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Header, Footer } from '@/presentation/components'
import { SurveyError, SurveyItem, SurveyItemEmpty } from './components'
import { LoadSurveyList } from '@/domain/usecases'
import { APIContext, SurveyContext } from '@/presentation/context'
import { AccessDeniedError } from '@/domain/errors'
import { useNavigate } from 'react-router-dom'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(APIContext)
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => {
        setState({ ...state, surveys })
      }).catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          navigate('/login', { replace: true })
        } else {
          setState({ ...state, error: error.message })
        }
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
