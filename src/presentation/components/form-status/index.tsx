import React from 'react'
import Styles from './styles.scss'
import { Spinner } from '../spinner'

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner}/>
      <span className={Styles.error}>error</span>
    </div>
  )
}

export { FormStatus }
