'use client';

import React from 'react';
import AddStudySpot from '../../components/AddStudySpot';
import Navbar from '../../components/Navbar';
import useRequireAuth from '@/hooks/useRequireAuth';

/**
 * UploadPage allows authenticated users to submit a new study spot.
 *
 * - Protects the route using `useRequireAuth` hook
 * - Displays a navbar and the form to upload a study spot
 */
export default function UploadPage() {
  // Redirects to login if the user is not authenticated
  useRequireAuth();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/images/DarkBlueBackground.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />
      <AddStudySpot />
    </div>
  );
}
