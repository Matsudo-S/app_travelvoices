'use client'

import React from 'react';
import Link from 'next/link';
import styles from './SubscriptionManagementButton.module.css';
import { useRouter } from 'next/navigation';

interface SubscriptionManagementButtonProps {
  className?: string;
}

const SubscriptionManagementButton: React.FC<SubscriptionManagementButtonProps> = ({ 
  className 
}) => {

  const router = useRouter();
  const loadPortal = async () => {
    const response = await fetch("api/portal");
    const data = await response.json();

    router.push(data.url);
  }

  return (
    <Link href="/pricing" onClick={loadPortal} className={`${styles.manageButton} ${className || ''}`}>
      サブスクリプション管理
    </Link>
  );
};

export default SubscriptionManagementButton;