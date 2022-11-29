import { FieldValidation } from '@/presentation/validation/protocols'

class FieldValidationSpy implements FieldValidation {
  constructor (readonly field: string) {}
  error: Error = null

  validate (value: string): Error {
    return this.error
  }
}

export { FieldValidationSpy }
