import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './styles.scss'
import Context from '@/presentation/context/form/form-context'
import {
  FormStatus,
  LoginHeader,
  Footer,
  Input
} from '@/presentation/components'

const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form data-testid="form" className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite o seu nome" />
          <Input type="email" name="email" placeholder="Digite o seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button
            data-testid="submit"
            type="submit"
            className={Styles.submit}
          >
              Entrar
          </button>
          <Link data-testid="signup" to="/signup" className={Styles.link}>
              Voltar Para Login
          </Link>
          <FormStatus />
        </form>
        <Footer />
      </Context.Provider>
    </div>
  )
}

export { SignUp }
