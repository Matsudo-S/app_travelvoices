import React from 'react'
import styles from './toast.module.css'

const Toast = ({ message, type, show }: {
  message: string
  type: 'success' | 'info' | 'error'
  show: boolean
}) => {
  return (
    <div className={`${styles.toast} ${styles[type]} ${show ? styles.show : styles.hide}`}>
      {message}
    </div>
  )
}

export default Toast
