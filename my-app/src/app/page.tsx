'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function SplashPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute inset-0 opacity-100 z-0"
        style={{
          backgroundImage: "url('/images/LightBlueBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto gap-12">
          
          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-4">MyStudySpace</h1>
            <p className="text-lg font-medium">
              Student powered study space archive<br />
              <span className="text-sm italic">add more description possibly</span>
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/images/Graphic1.png"
              alt="Map illustration with study spots"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

