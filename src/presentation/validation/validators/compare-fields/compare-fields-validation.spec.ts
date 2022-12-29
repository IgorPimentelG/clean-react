import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/presentation/validation/errors'
import faker from 'faker'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToComapare = faker.database.column()
    const sut = makeSut(field, fieldToComapare)
    const error = sut.validate({
      [field]: faker.random.words(4),
      [fieldToComapare]: faker.random.words(5)
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToComapare = faker.database.column()
    const sut = makeSut(field, fieldToComapare)
    const value = faker.random.word()
    const error = sut.validate({
      [field]: value,
      [fieldToComapare]: value
    })
    expect(error).toBeFalsy()
  })
})
