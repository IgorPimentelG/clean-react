import React from 'react'
import styles from './styles.module.scss'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

const Spinner: React.FC<Props> = (props: Props) => {
  const negativeClass = props.isNegative ? styles.negative : ''
  return (
    <div
      {...props}
      data-testid="spinner"
      className={[styles.spinner, props.className, negativeClass].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export { Spinner }
