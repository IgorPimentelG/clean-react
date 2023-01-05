import faker from 'faker'
import { screen, fireEvent } from '@testing-library/react'

export const testChildCount = (field: string, count: number): void => {
  expect(screen.getByTestId(field).childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const element = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(element.disabled).toBe(isDisabled)
}

export const testStatusForField = (
  fieldName: string,
  validationError: string = ''
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  expect(field).toHaveProperty('title', validationError)
  expect(label).toHaveProperty('title', validationError)
}

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  fireEvent.input(screen.getByTestId(fieldName), { target: { value } })
}

export const testElementExists = (fieldName: string): void => {
  expect(screen.queryByTestId(fieldName)).toBeInTheDocument()
}
