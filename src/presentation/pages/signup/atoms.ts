import { atom } from 'recoil'

const signUpState = atom({
  key: 'signUpState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: ''
  }
})

export { signUpState }
