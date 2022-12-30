export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export type Model = {
    question: string
    date: Date
    answers: Answers[]
  }

  export type Answers = {
    image?: string
    answer: string
    count: number
    percent: number
  }
}
