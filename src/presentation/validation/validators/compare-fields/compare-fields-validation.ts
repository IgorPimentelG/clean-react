import { FieldValidation } from '@/presentation/validation/protocols'
import { InvalidFieldError } from '@/presentation/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    readonly valueToCompare: string
  ) {}

  validate (value: string): Error {
    return value === this.valueToCompare ? null : new InvalidFieldError()
  }
}
