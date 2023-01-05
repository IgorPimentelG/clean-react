import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { currentAccountState } from '@/presentation/shared/atoms'

type Props = {
  children: ReactNode
}

const PrivateRoutes: React.FC<Props> = ({ children }) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  return getCurrentAccount()?.accessToken
    ? (<>{children}</>)
    : <Navigate to="/login" replace />
}

export { PrivateRoutes }
