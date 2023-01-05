import faker from 'faker'

import { GetStorage } from '../protocols/cache'

class GetStorageSpy implements GetStorage {
    key: string
    value: any = faker.random.objectElement()

    get (key: string): any {
      this.key = key
      return this.value
    }
}

export { GetStorageSpy }
