'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfileInfo() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');

    if (!isLoggedIn || !email) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      const res = await fetch('/api/user/profile', {
        headers: { 'x-user-email': email },
      });

      const data = await res.json();
      setUserData(data);
      if (data.profileImage) {
        setPreviewImage(data.profileImage);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  const handleProfileImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setPreviewImage(base64);

      const email = localStorage.getItem('userEmail');
      if (!email) return;

      const res = await fetch('/api/user/profile-picture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, profile_picture: base64 }),
      });

      const updated = await res.json();
      setUserData(updated);
    };
    reader.readAsDataURL(file);
  };

  const loadingSkeleton = (
    <div className="text-white min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/DarkBlueBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative z-10">
        <Navbar />
        <div className="flex flex-col items-center justify-center mt-8 mb-12 px-4">
          <div className="w-[120px] h-[120px] rounded-full bg-gray-700 animate-pulse mb-4" />
          <div className="h-6 w-40 bg-gray-700 rounded-md animate-pulse mb-2" />
          <div className="h-4 w-28 bg-gray-600 rounded-md animate-pulse" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 px-8 pb-20">
          <div>
            <h3 className="text-xl font-semibold mb-4">Liked Study Spots</h3>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex bg-[#1B263B] rounded-lg shadow-md p-4 mb-4 animate-pulse">
                <div className="w-[100px] h-[100px] bg-gray-600 rounded-md" />
                <div className="ml-4 flex flex-col justify-center">
                  <div className="h-5 w-32 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-48 bg-gray-600 rounded" />
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Uploaded Study Spots</h3>
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex bg-[#1B263B] rounded-lg shadow-md p-4 mb-4 animate-pulse">
                <div className="w-[100px] h-[100px] bg-gray-600 rounded-md" />
                <div className="ml-4 flex flex-col justify-center">
                  <div className="h-5 w-32 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-48 bg-gray-600 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!userData) return loadingSkeleton;

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/DarkBlueBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10">
        <Navbar />

        <div className="flex flex-col items-center justify-center mt-8 mb-12 px-4">
          <div className="relative">
            <Image
              src={previewImage || '/images/defaultProfilePicture.png'}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full object-cover border-2 border-white"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="absolute bottom-0 left-0 w-full text-xs text-white bg-black bg-opacity-70 text-center px-2 py-1 cursor-pointer opacity-80 hover:opacity-100 rounded-b-md"
            />
          </div>
          <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
          <p className="text-sm text-gray-300">{userData.email}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 px-8 pb-20">
          <div>
            <h3 className="text-xl font-semibold mb-4">Liked Study Spots</h3>
            {userData.likedSpots?.length > 0 ? (
              userData.likedSpots.map((spot: any, index: number) => (
                <div key={index} className="flex bg-[#1B263B] rounded-lg shadow-md p-4 mb-4">
                  <Image src={spot.image} alt={spot.name} width={100} height={100} className="rounded-md" />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">{spot.name}</h4>
                    <p className="text-sm text-gray-300">{spot.address}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No liked spots yet.</p>
            )}
            <Link href="/upload" className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition">
              Add a spot
            </Link>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Uploaded Study Spots</h3>
            {userData.uploadedSpots?.length > 0 ? (
              userData.uploadedSpots.map((spot: any, index: number) => (
                <div key={index} className="flex bg-[#1B263B] rounded-lg shadow-md p-4 mb-4">
                  <Image src={spot.image} alt={spot.name} width={100} height={100} className="rounded-md" />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">{spot.name}</h4>
                    <p className="text-sm text-gray-300">{spot.address}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No uploads yet.</p>
            )}
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
