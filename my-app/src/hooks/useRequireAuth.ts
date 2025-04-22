'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Redirects unauthenticated users to the login page.
 *
 * Checks for `isLoggedIn` in localStorage.
 * If the user is not logged in, navigates to `/login`.
 * Should be called at the top of any protected client component.
 */
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
