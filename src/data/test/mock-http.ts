import faker from 'faker'
import {
  HttpPostClient,
  HttpPostParams,
  HttpReponse,
  HttpStatusCode
} from '@/data/protocols/http'

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
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

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
