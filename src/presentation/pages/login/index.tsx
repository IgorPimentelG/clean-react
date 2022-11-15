import React, { useState, useEffect } from 'react'
import Styles from './styles.scss'
import Context from '@/presentation/context/form/form-context'
import { Authentication } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols/validation'
import {
  FormStatus,
  LoginHeader,
  Footer,
  Input
} from '@/presentation/components'

type Props = {
  validation?: Validation
  authentication?: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    error: '',
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (state.isLoading) {
      return
    }

    setState({
      ...state,
      isLoading: true
    })
    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite o seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button
            data-testId="submit"
            type="submit"
            disabled={!!state.emailError || !!state.passwordError}
            className={Styles.submit}
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
        <Footer />
      </Context.Provider>
    </div>
  )
}

export { Login }
