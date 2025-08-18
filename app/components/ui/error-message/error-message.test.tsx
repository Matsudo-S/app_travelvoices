import { render, screen } from '@testing-library/react';
import ErrorMessage from './page';

describe('ErrorMessage', () => {
  it('エラーメッセージを表示する', () => {
    const errorMessage = 'テストエラーメッセージ';
    render(<ErrorMessage message={errorMessage} />);
    expect(screen.getByText('テストエラーメッセージ')).toBeInTheDocument();
  });

  it('エラーメッセージが正しいスタイルで表示される', () => {
    const errorMessage = 'テストエラーメッセージ';
    render(<ErrorMessage message={errorMessage} />);
    const messageElement = screen.getByText('テストエラーメッセージ');
    expect(messageElement).toHaveClass('errorMessage');
  });
});
