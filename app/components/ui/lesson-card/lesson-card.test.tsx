import { render, screen } from '@testing-library/react';
import LessonCard from './page';
import { Lesson } from '../../../types';

const mockLesson: Lesson = {
  id: '1',
  title: 'テストレッスン',
  description: 'テスト用のレッスンです',
  content: 'テストコンテンツ',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
};

describe('LessonCard', () => {
  it('レッスンのタイトルを表示する', () => {
    render(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('テストレッスン')).toBeInTheDocument();
  });

  it('レッスンの説明を表示する', () => {
    render(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('テスト用のレッスンです')).toBeInTheDocument();
  });

  it('レッスンの内容を表示する', () => {
    render(<LessonCard lesson={mockLesson} />);
    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
  });
});
