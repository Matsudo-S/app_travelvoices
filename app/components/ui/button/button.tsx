import React from 'react';
import Link from 'next/link';
import styles from './button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'back' | 'gradient' | 'frame';
  className?: string;
  disabled?: boolean;
}

function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: ButtonProps) {
  const computedClassName = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link href={href} className={computedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={computedClassName} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
