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

      // Send to backend
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

  if (!userData) return <div className="text-white p-10">Loading profile...</div>;

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/DarkBlueBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Foreground */}
      <div className="relative z-10">
        <Navbar />

        {/* Profile Header */}
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

        {/* Study Spots Section */}
        <div className="grid md:grid-cols-2 gap-6 px-8 pb-20">
          {/* Liked Study Spots */}
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

          {/* Uploaded Study Spots */}
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

