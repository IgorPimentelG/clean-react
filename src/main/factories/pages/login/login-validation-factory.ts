import { ValidationBuilder as Builder, ValidationComposite } from '@/presentation/validation/validators'

const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build()
  ])
}

export { makeLoginValidation }
