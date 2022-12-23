export type SurveyModel = {
  id: string
  question: string
  answers: Answer[]
  date: Date
  didAnswer: boolean
}

export type Answer = {
  image?: string
  answer: string
}
