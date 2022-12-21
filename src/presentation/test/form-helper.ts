import { RenderResult, fireEvent } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const element = sut.getByTestId(field)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const element = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(element.disabled).toBe(isDisabled)
}

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  const element = sut.getByTestId(fieldName)
  fireEvent.input(element, { target: { value } })
}
