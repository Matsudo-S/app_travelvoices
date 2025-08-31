import { useState, useCallback } from 'react'

interface ToastState {
  message: string
  type: 'success' | 'info'
  show: boolean
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'info',
    show: false
  })

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type, show: true })
    
    // 1.5秒後に自動的に消す
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, 1500)
  }, [])

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }))
  }, [])

  return {
    toast,
    showToast,
    hideToast
  }
}
