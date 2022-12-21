import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Styles from './styles.scss'
import Context from '@/presentation/context/form/form-context'
import {
  FormStatus,
  LoginHeader,
  Footer,
  Input
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation?: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmationError
      )
    })
  }, [state])

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite o seu nome" />
          <Input type="email" name="email" placeholder="Digite o seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button
            data-testid="submit"
            type="submit"
            disabled
            className={Styles.submit}
          >
              Cadastrar
          </button>
          <span data-testid="signup" className={Styles.link}>
              Voltar Para Login
          </span>
          <FormStatus />
        </form>
        <Footer />
      </Context.Provider>
    </div>
  )
}

export { SignUp }
