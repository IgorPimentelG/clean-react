import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'

export class LoadSurveyListSpy implements LoadSurveyList {
    callsCount = 0

    async loadAll (): Promise<SurveyModel[]> {
      this.callsCount++
      return null
    }
}
