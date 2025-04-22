'use client';

import ProfileInfo from '@/components/ProfileInfo';
import useRequireAuth from '@/hooks/useRequireAuth';

/**
 * UserPage displays the authenticated user's profile information.
 *
 * - Protects access with `useRequireAuth` hook
 * - Renders the `ProfileInfo` component on successful auth
 */
export default function UserPage() {
  // Redirects to login if user is not authenticated
  useRequireAuth();

  return <ProfileInfo />;
}
