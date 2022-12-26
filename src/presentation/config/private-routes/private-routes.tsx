import React, { useContext, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { APIContext } from '@/presentation/context'

type Props = {
  children: ReactNode
}

const PrivateRoutes: React.FC<Props> = ({ children }) => {
  const { getCurrentAccount } = useContext(APIContext)
  return getCurrentAccount()?.accessToken
    ? (<>{children}</>)
    : <Navigate to="/login" replace />
}

export { PrivateRoutes }
