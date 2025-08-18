import '@testing-library/jest-dom'

// Jest DOM matchers for TypeScript
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveTextContent(text: string | RegExp): R
      toBeVisible(): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeEmpty(): R
      toBeEmptyDOMElement(): R
      toHaveFocus(): R
      toHaveFormValues(expectedValues: Record<string, any>): R
      toHaveValue(value: string | string[] | number): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveDescription(text?: string | RegExp): R
    }
  }
}

// レッスンの型定義
export interface Lesson {
  id: number;
  title: string | null;
  description?: string | null;
  content?: string | null;
  created_at?: string;
  updated_at?: string;
}

// ユーザーの型定義
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at?: string;
}

// APIレスポンスの型定義
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// ページネーションの型定義
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
