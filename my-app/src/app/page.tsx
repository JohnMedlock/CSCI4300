'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';



export default function SplashPage() {

  
  return (
    <main className="min-h-screen relative overflow-hidden bg-white">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/LightBlueBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-white">
        <Navbar />

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-6 py-24 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow">
            Your Campus Study Guide
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 text-white/90">
            Discover quiet corners, cozy cafés, and perfect campus hideaways — curated by students, for students.
            Save the ones you love and contribute your favorites to help others focus better, together.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/map"
              className="bg-white text-[#354B74] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition"
            >
              Browse the Map
            </Link>
            <Link
              href="/upload"
              className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-[#354B74] transition"
            >
              Share a Study Spot
            </Link>
          </div>
        </section>

        {/* Graphic Highlights Section */}
        <section className="py-16 px-4 bg-white/10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-start text-center">
            <div>
              <Image
                src="/Graphic2.png"
                alt="Find the Perfect Study Spot"
                width={400}
                height={300}
                className="mx-auto mb-4 rounded-lg shadow-lg"
              />
              <h3 className="text-2xl font-semibold mb-2 text-white">Find the Perfect Study Spot</h3>
              <p className="text-sm text-white/80">
                Browse an ever-growing map of study spaces with reviews and images from real students.
              </p>
            </div>

            <div>
              <Image
                src="/Graphic3.png"
                alt="Save the ones you love"
                width={400}
                height={300}
                className="mx-auto mb-4 rounded-lg shadow-lg"
              />
              <h3 className="text-2xl font-semibold mb-2 text-white">Save the Ones You Love</h3>
              <p className="text-sm text-white/80">
                Create a collection of your favorite study spots and access them anytime, anywhere.
              </p>
            </div>

            <div>
              <Image
                src="/Graphic1.png"
                alt="Upload Study Spots"
                width={400}
                height={300}
                className="mx-auto mb-4 rounded-lg shadow-lg"
              />
              <h3 className="text-2xl font-semibold mb-2 text-white">Upload Study Spots</h3>
              <p className="text-sm text-white/80">
                Know a hidden gem? Share it with others and help build a better study community.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  );
}

