export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpReponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'

export type HttpRequest = {
  url: string
  method: HttpMethod
  headers?: any
  body?: any
}

export interface HttpClient<R = any> {
  request: (params: HttpRequest) => Promise<HttpReponse<R>>
}
