'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [router]);
};

export default useRequireAuth;

