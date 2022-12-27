import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Styles from './styles.scss'
import { FormContext, APIContext } from '@/presentation/context'
import { Authentication } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols/validation'
import {
  FormStatus,
  LoginHeader,
  Footer,
  Input,
  SubmitButton
} from '@/presentation/components'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(APIContext)
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    error: '',
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return

      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      setCurrentAccount(account)
      navigate('/survey-list', { replace: true })
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite o seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <SubmitButton text="Entrar" />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
        <Footer />
      </FormContext.Provider>
    </div>
  )
}

export { Login }
