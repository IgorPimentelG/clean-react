import React, { memo } from 'react'
import { useRecoilValue } from 'recoil'

import styles from './styles.module.scss'
import { Logo } from '../logo'
import { useLogout } from '@/presentation/hooks'
import { currentAccountState } from '@/presentation/shared/atoms'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useRecoilValue(currentAccountState)

  function handleLogout (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault()
    logout()
  }

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={handleLogout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
