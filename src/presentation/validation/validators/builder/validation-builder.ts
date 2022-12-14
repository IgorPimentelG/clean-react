import { CompareFieldsValidation } from './../compare-fields/compare-fields-validation'
import { FieldValidation } from '@/presentation/validation/protocols'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation
} from '@/presentation/validation/validators'

class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  min (length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length))
    return this
  }

  sameAs (fieldToComapare: string): ValidationBuilder {
    this.validations.push(new CompareFieldsValidation(this.fieldName, fieldToComapare))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}

export { ValidationBuilder }
