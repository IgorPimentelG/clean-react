import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AddAccount } from '@/domain/usecases'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

class RemoteAddAccount implements AddAccount {
  constructor (
    readonly url: string,
    private readonly HttpClient: HttpClient<RemoteAddAccount.Model>
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.HttpClient.request({
      method: 'POST',
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}

export { RemoteAddAccount }

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
