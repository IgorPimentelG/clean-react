import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { SetStorage } from '@/data/protocols/cache'
import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}

  async save (account: AccountModel): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError()
    }
    this.setStorage.set('account', JSON.stringify(account))
  }
}

export { LocalUpdateCurrentAccount }
