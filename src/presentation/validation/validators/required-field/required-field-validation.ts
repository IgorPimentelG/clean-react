import { RequiredFieldError } from '@/presentation/validation/errors'
import { FieldValidation } from '@/presentation/validation/protocols'

class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}

export { RequiredFieldValidation }
