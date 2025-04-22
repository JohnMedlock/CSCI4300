'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfileInfo() {
  const router = useRouter();

  // State to hold user data and profile image preview
  const [userData, setUserData] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // States for editing uploaded study spots
  const [editingSpotId, setEditingSpotId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Fetch user data and redirect if not logged in
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

  // Log the user out by clearing localStorage and redirecting
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  // Delete a study spot by ID and update state
  const handleDeleteSpot = async (spotId: string) => {
    try {
      const response = await fetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUserData((prev: any) => ({
          ...prev,
          uploadedSpots: prev.uploadedSpots.filter((spot: any) => spot._id !== spotId),
        }));
      } else {
        console.error('Failed to delete spot');
      }
    } catch (error) {
      console.error('Error deleting spot:', error);
    }
  };

  // Update a spot's name and description
  const handleUpdateSpot = async (spotId: string) => {
    try {
      const res = await fetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editName, description: editDescription }),
      });
  
      if (res.ok) {
        const updatedSpot = await res.json();
        setUserData((prev: any) => ({
          ...prev,
          uploadedSpots: prev.uploadedSpots.map((spot: any) =>
            spot._id === spotId ? updatedSpot : spot
          ),
        }));
        setEditingSpotId(null);
      } else {
        console.error('Failed to update spot');
      }
    } catch (err) {
      console.error('Error updating spot:', err);
    }
  };
  
  // Handle image file input and upload new profile picture
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

  // Show loading state if user data isn't loaded yet
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/DarkBlueBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <div className="flex flex-col items-center mt-8 mb-12 px-4">
          <div className="relative">
            <Image
              src={previewImage || '/images/defaultProfilePicture.png'}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-md w-full sm:w-[100px] h-auto object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-xs text-center px-2 py-1 cursor-pointer opacity-80 hover:opacity-100 rounded-b-md"
            />
          </div>
          <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
          <p className="text-sm text-gray-300">{userData.email}</p>
        </div>

        <div className="flex justify-center px-4 sm:px-6 md:px-8 pb-20">
          {/*
          <div>
            <h3 className="text-xl font-semibold mb-4">Liked Study Spots</h3>
            {userData.likedSpots?.length > 0 ? (
              userData.likedSpots.map((spot: any, index: number) => (
                <div key={index} className="flex bg-[#1B263B] rounded-lg shadow-md p-4 mb-4">
                  <Image src={spot.image} alt={spot.name} width={100} height={100} className="rounded-md w-full sm:w-[100px] h-auto object-cover" />
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
          </div>  */}

          {/* Uploaded spots list */}
          <div className="w-full max-w-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center w-full border-b border-gray-500 pb-2">Uploaded Study Spots</h3>
            {userData.uploadedSpots?.length > 0 ? (
              userData.uploadedSpots.map((spot: any) => (
                <div key={spot._id} className="spot-card border p-4 rounded-md shadow-md my-2">
                  {editingSpotId === spot._id ? (
                    <>
                    {/* Edit spot form */}
                      <div>
                        <label className="block text-orange-500 font-semibold mb-1">
                          Edit Location Name:
                        </label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="mb-2 p-1 text-white w-full"
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <label className="block text-orange-500 font-semibold mb-1">
                          Edit Description:
                        </label>
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="mb-2 p-1 text-white w-full"
                          placeholder="Description"
                        />
                      </div>
                      <button
                        onClick={() => handleUpdateSpot(spot._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingSpotId(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold">{spot.name}</h3>
                      <p>{spot.description}</p>
                      <button
                        onClick={() => {
                          setEditingSpotId(spot._id);
                          setEditName(spot.name);
                          setEditDescription(spot.description);
                        }}
                        className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSpot(spot._id)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
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
