import faker from 'faker'
import {
  HttpGetClient,
  HttpPostClient,
  HttpPostParams,
  HttpReponse,
  HttpStatusCode,
  HttpGetParams
} from '@/data/protocols/http'

export class HttpPostClientSpy<R = any> implements HttpPostClient<R> {
    url?: string
    body?: any
    response: HttpReponse<R> = {
      statusCode: HttpStatusCode.ok
    }

    async post (params: HttpPostParams): Promise<HttpReponse<R>> {
      this.url = params.url
      this.body = params.body
      return Promise.resolve(this.response)
    }
}

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string
  headers?: any
  response: HttpReponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpReponse<R>> {
    this.url = params.url
    this.headers = params.headers
    return Promise.resolve(this.response)
  }
}

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement()
})
