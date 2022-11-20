import { RequiredFieldError } from '../errors'
import { FieldValidation } from '../protocols'

class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (fieldValue: string): Error {
    return new RequiredFieldError()
  }
}

export { RequiredFieldValidation }
