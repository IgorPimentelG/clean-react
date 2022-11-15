import { AccountModel } from '@/domain/models'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { mockAccountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
    account = mockAccountModel()
    params: AuthenticationParams
    callsCount = 0

    async auth (params: AuthenticationParams): Promise<AccountModel> {
      this.callsCount++
      this.params = params
      return Promise.resolve(this.account)
    }
}

export { AuthenticationSpy }
