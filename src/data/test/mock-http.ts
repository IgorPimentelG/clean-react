import faker from 'faker'
import {
  HttpReponse,
  HttpStatusCode,
  HttpRequest,
  HttpClient
} from '@/data/protocols/http'

export class HttpClientSpy<R = any> implements HttpClient<R> {
    method?: string
    url?: string
    headers?: any
    body?: any
    response: HttpReponse<R> = {
      statusCode: HttpStatusCode.ok
    }

    async request (params: HttpRequest): Promise<HttpReponse<R>> {
      this.method = params.method
      this.url = params.url
      this.headers = params.headers
      this.body = params.body
      return Promise.resolve(this.response)
    }
}

export const mockRequest = (): HttpRequest => ({
  method: faker.random.arrayElement(['POST', 'GET', 'PUT', 'DELETE']),
  url: faker.internet.url(),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})
