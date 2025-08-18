import { render, screen, fireEvent } from '@testing-library/react';
import Button from './page';

describe('Button', () => {
  it('ボタンテキストを表示する', () => {
    render(<Button>テストボタン</Button>);
    expect(screen.getByText('テストボタン')).toBeInTheDocument();
  });

  it('リンクとして機能する', () => {
    render(<Button href="/test">リンクボタン</Button>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('クリックイベントを処理する', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>クリックボタン</Button>);
    
    fireEvent.click(screen.getByText('クリックボタン'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('バリアントに応じたクラスを適用する', () => {
    render(<Button variant="secondary">セカンダリボタン</Button>);
    const button = screen.getByText('セカンダリボタン');
    expect(button).toHaveClass('secondary');
  });

  it('戻るボタンのスタイルを適用する', () => {
    render(<Button variant="back">← 戻る</Button>);
    const button = screen.getByText('← 戻る');
    expect(button).toHaveClass('back');
  });
});
