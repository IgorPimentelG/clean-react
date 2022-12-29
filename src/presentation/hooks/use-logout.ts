import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { APIContext } from '@/presentation/context'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useContext(APIContext)
  return (): void => {
    setCurrentAccount(undefined)
    navigate('/login', { replace: true })
  }
}
