import React, { memo, useContext } from 'react'
import { Logo } from '../logo'
import styles from './styles.module.scss'
import { APIContext } from '@/presentation/context'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(APIContext)
  const navigate = useNavigate()

  function logout (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault()
    setCurrentAccount(undefined)
    navigate('/login', { replace: true })
  }

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={logout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
