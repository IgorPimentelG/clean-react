import { HttpReponse } from './http-response'

export type HttpGetClientParams = {
  url: string
}

export interface HttpGetClient<R> {
  get: (params: HttpGetClientParams) => Promise<HttpReponse<R>>
}
