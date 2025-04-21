"use client";

import React from 'react';
import AddStudySpot from '../../components/AddStudySpot';
import Navbar from '../../components/Navbar';
import useRequireAuth from '@/hooks/useRequireAuth';

export default function UploadPage() {
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
