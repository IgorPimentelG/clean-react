import React, { useState } from 'react'
import Styles from './styles.scss'
import Context from '@/presentation/context/form/form-context'
import {
  FormStatus,
  LoginHeader,
  Footer,
  Input
} from '@/presentation/components'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })
  const [errorState] = useState({
    error: '',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório'
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
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
