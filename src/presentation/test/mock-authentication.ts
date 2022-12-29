import { mockAccountModel } from '@/domain/test'
import { Authentication } from '@/domain/usecases/authentication'

class AuthenticationSpy implements Authentication {
    account = mockAccountModel()
    params: Authentication.Params
    callsCount = 0

    async auth (params: Authentication.Params): Promise<Authentication.Model> {
      this.callsCount++
      this.params = params
      return Promise.resolve(this.account)
    }
}

export { AuthenticationSpy }
