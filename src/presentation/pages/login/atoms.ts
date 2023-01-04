import { atom } from 'recoil'

const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    error: '',
    emailError: '',
    passwordError: ''
  }
})

export { loginState }
