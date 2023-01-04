import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { Input } from './index'
import faker from 'faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Input name={fieldName} state={{} as any} setState={null} />
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const fieldName = faker.database.column()
    const { getByTestId } = makeSut(fieldName)
    const input = getByTestId(fieldName) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const fieldName = faker.database.column()
    const { getByTestId } = makeSut(fieldName)
    const input = getByTestId(fieldName) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  test('Should focus input on label click', () => {
    const fieldName = faker.database.column()
    const { getByTestId } = makeSut(fieldName)
    const input = getByTestId(fieldName) as HTMLInputElement
    const label = getByTestId(`${fieldName}-label`) as HTMLInputElement
    fireEvent.click(label)
    expect(document.activeElement).toBe(input)
  })
})
