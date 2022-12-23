import { HttpReponse } from './http-response'

export type HttpGetParams = {
  url: string
}

export interface HttpGetClient<R = any> {
  get: (params: HttpGetParams) => Promise<HttpReponse<R>>
}
