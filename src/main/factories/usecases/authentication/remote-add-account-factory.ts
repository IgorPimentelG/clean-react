import { AddAccount } from '@/domain/usecases'
import { RemoteAddAccount } from '@/data/usecases'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'

const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}

export { makeRemoteAddAccount }
