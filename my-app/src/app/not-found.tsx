'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0f172a] text-white px-4 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        Oops! The page you're looking for doesn't exist or was moved.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
