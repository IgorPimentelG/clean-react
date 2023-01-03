import { GetStorage } from '@/data/protocols/cache'
import { HttpClient, HttpRequest, HttpReponse } from '@/data/protocols/http'

class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpClient
  ) {}

  async request (params: HttpRequest): Promise<HttpReponse> {
    const account = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          'x-access-token': account.accessToken
        })
      })
    }

    return await this.httpGetClient.request(params)
  }
}

export { AuthorizeHttpClientDecorator }
