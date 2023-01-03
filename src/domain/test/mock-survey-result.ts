import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import faker from 'faker'

export const mockSurveyResult = (): LoadSurveyResult.Model => ({
  date: faker.date.recent(),
  question: faker.random.words(10),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.word(),
    count: faker.random.number(),
    percent: faker.random.number(100),
    isCurrentAccountAnswer: true
  }, {
    answer: faker.random.word(),
    count: faker.random.number(),
    percent: faker.random.number(100),
    isCurrentAccountAnswer: false
  }]
})

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.word()
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
    callsCount = 0
    surveyResult = mockSurveyResult()

    async load (): Promise<LoadSurveyResult.Model> {
      this.callsCount++
      return this.surveyResult
    }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params
  surveyResult = mockSurveyResult()

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.params = params
    return this.surveyResult
  }
}
