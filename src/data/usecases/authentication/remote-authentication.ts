import { InvalidCredentailsError } from '@/domain/errors/invallid-credentails-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AccountModel } from '@/domain/models/account-model'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.unathorized: throw new InvalidCredentailsError()
      default: throw new UnexpectedError()
    }
  }
}
