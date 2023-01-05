import faker from 'faker'

import { RemoteLoadSurveyList } from '@/data/usecases'

export const mockRemoteSurveyList = (): RemoteLoadSurveyList.Model[] => ([
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    didAnswer: faker.random.boolean(),
    date: faker.date.recent().toISOString()
  }
])
