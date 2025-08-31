import React from 'react'
import styles from './toast.module.css'

interface ToastProps {
  message: string
  type: 'success' | 'info'
  show: boolean
}

const Toast: React.FC<ToastProps> = ({ message, type, show }) => {
  return (
    <div className={`${styles.toast} ${styles[type]} ${show ? styles.show : styles.hide}`}>
      {message}
    </div>
  )
}

export default Toast
