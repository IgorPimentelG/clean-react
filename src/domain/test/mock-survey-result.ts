import { LoadSurveyResult } from '@/domain/usecases'
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

export class LoadSurveyResultSpy implements LoadSurveyResult {
    callsCount = 0
    surveyResult = mockSurveyResult()

    async load (): Promise<LoadSurveyResult.Model> {
      this.callsCount++
      return this.surveyResult
    }
}
