'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function SplashPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-60 z-0"
        style={{
          backgroundImage: "url('/images/LightBlueBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <div className="flex flex-col items-center justify-center text-white text-center px-6 py-20">
          <h1 className="text-5xl font-bold mb-4">MyStudySpace</h1>
          <p className="text-lg font-medium mb-10">
            Student powered study space archive<br />
            <span className="text-sm italic">add more description possibly</span>
          </p>
          <div className="w-full max-w-[600px]">
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

