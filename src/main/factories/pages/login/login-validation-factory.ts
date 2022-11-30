import { ValidationBuilder, ValidationComposite } from '@/presentation/validation/validators'

const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
}

export { makeLoginValidation }
