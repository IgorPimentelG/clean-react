import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { currentAccountState } from '@/presentation/shared/atoms'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  return (): void => {
    setCurrentAccount(undefined)
    navigate('/login', { replace: true })
  }
}
