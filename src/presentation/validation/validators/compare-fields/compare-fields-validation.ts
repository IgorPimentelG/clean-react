import { FieldValidation } from '@/presentation/validation/protocols'
import { InvalidFieldError } from '@/presentation/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    readonly fieldToCompare: string
  ) {}

  validate (input: object): Error {
    return input[this.field] === input[this.fieldToCompare] ? null : new InvalidFieldError()
  }
}
