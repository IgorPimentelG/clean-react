import { RemoteSurveyResultModel } from '@/data/models'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases'

class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly HttpClient: HttpClient<LoadSurveyResult.Model>
  ) {}

  async load (): Promise<LoadSurveyResult.Model> {
    const response = await this.HttpClient.request({ method: 'GET', url: this.url })
    const remoteSurveyResult = response.body
    switch (response.statusCode) {
      case HttpStatusCode.ok: return Object.assign({}, remoteSurveyResult, { date: new Date(remoteSurveyResult.date) })
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export { RemoteLoadSurveyResult }

export namespace RemoteLoadSurveyResult {
  export type Model = RemoteSurveyResultModel
}
