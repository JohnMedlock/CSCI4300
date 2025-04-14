"use client";

import React from 'react';
import AddStudySpot from '../../components/AddStudySpot';
import Navbar from '../../components/Navbar';

export default function UploadPage() {
  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/images/LightBlueBackground.png)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />
      <AddStudySpot />
    </div>
  );
}