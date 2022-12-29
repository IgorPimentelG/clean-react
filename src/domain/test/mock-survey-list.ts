import { LoadSurveyList } from '@/domain/usecases'
import faker from 'faker'

export const mockSurveyList = (): LoadSurveyList.Model[] => ([
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    didAnswer: faker.random.boolean(),
    date: faker.date.recent()
  }
])
