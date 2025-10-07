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
  disabled = false
}: ButtonProps) {
  const buttonClass = `${styles.button} ${styles[variant]} ${className ? styles[className] : ''}`;

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
