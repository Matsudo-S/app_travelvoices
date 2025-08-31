import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Toast from './toast'

describe('Toast', () => {
  it('renders toast message', () => {
    render(<Toast message="テストメッセージ" type="info" show={true} />)
    expect(screen.getByText('テストメッセージ')).toBeInTheDocument()
  })

  it('applies correct CSS classes based on type', () => {
    render(<Toast message="テストメッセージ" type="success" show={true} />)
    const toast = screen.getByText('テストメッセージ').parentElement
    expect(toast).toHaveClass('toast', 'success', 'show')
  })

  it('hides toast when show is false', () => {
    render(<Toast message="テストメッセージ" type="info" show={false} />)
    const toast = screen.getByText('テストメッセージ').parentElement
    expect(toast).toHaveClass('toast', 'hide')
  })
})
