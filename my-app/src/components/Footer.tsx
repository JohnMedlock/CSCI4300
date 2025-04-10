'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#354B74] text-white py-8 px-6 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <h2 className="text-xl font-semibold">MyStudySpace</h2>
          <p className="text-sm text-white/70">
            Helping students find the perfect place to focus since 2025.
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          <Link href="/map" className="hover:underline">
            Map
          </Link>
          <Link href="/upload" className="hover:underline">
            Upload
          </Link>
          <Link href="/saved" className="hover:underline">
            Saved
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-white/60">
        {new Date().getFullYear()} MyStudySpace.
      </div>
    </footer>
  );
};

export default Footer;

