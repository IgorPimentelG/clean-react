import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols'

class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}

export { RequiredFieldValidation }
