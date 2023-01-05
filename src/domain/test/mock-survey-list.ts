import faker from 'faker'

import { LoadSurveyList } from '@/domain/usecases'

export const mockSurveyList = (): LoadSurveyList.Model[] => ([
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    didAnswer: faker.random.boolean(),
    date: faker.date.recent()
  }
])
