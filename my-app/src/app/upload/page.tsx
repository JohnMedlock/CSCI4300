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
        backgroundColor: '#5283b7' 
      }}
    >
      
      <Navbar /> 
      <div className="pt-16 pb-8 px-4"> 
        <div className="max-w-xl mx-auto text-center text-white mb-4">
          <h1 className="text-4xl font-bold mb-2">Add a New Study Spot</h1>
          <p className="text-lg opacity-90">Share your favorite study locations on campus with other students!</p>
        </div>
        
        <AddStudySpot />
      </div>
    </div>
  );
}