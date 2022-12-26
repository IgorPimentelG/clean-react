
import { RemoteAuthentication } from '@/data/usecases'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { Authentication } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}

export { makeRemoteAuthentication }
