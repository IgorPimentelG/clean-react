import { atom } from 'recoil'

import { LoadSurveyList } from '@/domain/usecases'

const surveyListState = atom({
  key: 'surveyListState',
  default: {
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  }
})

export { surveyListState }
