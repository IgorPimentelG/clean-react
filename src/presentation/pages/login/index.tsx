import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { loginState } from './atoms'
import { Link, useNavigate } from 'react-router-dom'
import { Authentication } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols/validation'
import { Input, SubmitButton, FormStatus } from './components'
import { LoginHeader, Footer } from '@/presentation/components'
import { currentAccountState } from '@/presentation/shared/atoms'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const resetLoginState = useResetRecoilState(loginState)
  const navigate = useNavigate()
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => resetLoginState(), [])

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    setState(old => ({
      ...old,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    }))
  }, [state.email, state.password])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return

      setState(old => ({
        ...old,
        isLoading: true
      }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      setCurrentAccount(account)
      navigate('/survey-list', { replace: true })
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        error: error.message
      }))
    }
  }

  return (
    <div className={styles.login}>
      <LoginHeader />
      <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite o seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <SubmitButton text="Entrar" />
        <Link data-testid="signup-link" to="/signup" className={styles.link}>
            Criar conta
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export { Login }
