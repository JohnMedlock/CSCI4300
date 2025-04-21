'use client';

import ProfileInfo from '@/components/ProfileInfo';
import useRequireAuth from '@/hooks/useRequireAuth';

export default function UserPage() {
  useRequireAuth();
  return <ProfileInfo />;
}
