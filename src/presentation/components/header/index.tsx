import React, { memo } from 'react'
import { Logo } from '../logo'
import styles from './styles.module.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span>Igor</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
