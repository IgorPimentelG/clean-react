import { FieldValidation } from '@/presentation/validation/protocols'
import { InvalidFieldError } from '@/presentation/validation/errors'

class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value: string): Error {
    return value.length >= this.minLength ? null : new InvalidFieldError()
  }
}

export { MinLengthValidation }
