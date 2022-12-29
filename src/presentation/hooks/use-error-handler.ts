import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { APIContext } from '@/presentation/context'
import { AccessDeniedError } from '@/domain/errors'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(APIContext)
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      navigate('/login', { replace: true })
    } else {
      callback(error)
    }
  }
}
