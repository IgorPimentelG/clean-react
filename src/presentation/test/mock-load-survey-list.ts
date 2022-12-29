import { mockSurveyList } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases'

export class LoadSurveyListSpy implements LoadSurveyList {
    callsCount = 0
    surveys = mockSurveyList()

    async loadAll (): Promise<LoadSurveyList.Model[]> {
      this.callsCount++
      return this.surveys
    }
}
