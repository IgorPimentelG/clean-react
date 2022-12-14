import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import styles from './styles.module.scss'
import { signUpState } from './atoms'
import { Input, SubmitButton, FormStatus } from './components'
import { AddAccount } from '@/domain/usecases'
import { currentAccountState } from '@/presentation/shared/atoms'
import { Validation } from '@/presentation/protocols/validation'
import { LoginHeader, Footer } from '@/presentation/components'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({
  validation,
  addAccount
}: Props) => {
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const navigate = useNavigate()
  const resetSignUpState = useResetRecoilState(signUpState)
  const [state, setState] = useRecoilState(signUpState)

  useEffect(() => resetSignUpState(), [])

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation', formData
    )

    setState(old => ({
      ...old,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return

      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      setCurrentAccount(account)
      navigate('/login', { replace: true })
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error.message
      })
    }
  }

  return (
    <div className={styles.signup}>
      <LoginHeader />
      <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
        <h2>Criar Conta</h2>
        <Input type="text" name="name" placeholder="Digite o seu nome" />
        <Input type="email" name="email" placeholder="Digite o seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />
        <SubmitButton text="cadastrar" />
        <Link to="/login" data-testid="login-link" className={styles.link}>
              Voltar Para Login
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export { SignUp }
