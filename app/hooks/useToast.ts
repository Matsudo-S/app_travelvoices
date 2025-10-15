import { useState, useCallback } from 'react'

export const useToast = () => {
  const [toast, setToast] = useState({
    message: '',
    type: 'info' as 'success' | 'info' | 'error',
    show: false,
  })

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
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
