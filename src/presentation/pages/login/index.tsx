import React, { useState, useEffect } from 'react'
import Styles from './styles.scss'
import Context from '@/presentation/context/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import {
  FormStatus,
  LoginHeader,
  Footer,
  Input
} from '@/presentation/components'

type Props = {
  validation?: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    error: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  })

  useEffect(() => {
    validation && validation.validate({ email: state.email })
  }, [state.email])

  useEffect(() => {
    validation && validation.validate({ password: state.password })
  }, [state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite o seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button
            data-testId="submit"
            type="submit"
            disabled
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
