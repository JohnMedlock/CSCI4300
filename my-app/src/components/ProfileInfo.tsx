'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';

export default function ProfileInfo() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      router.push('/login'); // Optional: protect the profile page
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
  };

  const user = {
    name: "Harry Potter",
    email: "hp934@uga.edu",
    profileImage: "/profilePicture.jpg",
  };

  const likedSpots = [
    {
      name: "1000 Faces Coffee",
      address: "510 N Thomas St, Athens, GA 30601",
      image: "/1000FacesCoffee.png",
    },
  ];

  const uploadedSpots = [
    {
      name: "1000 Faces Coffee",
      address: "510 N Thomas St, Athens, GA 30601",
      image: "/1000FacesCoffee.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-[#1B263B] p-4 rounded-md mb-6">
        <h1 className="text-xl font-bold">MyStudySpace</h1>
        <div className="flex space-x-4">
          <button onClick={() => router.push("/map")}>Map</button>
          <span>{user.name.toLowerCase()}</span>
        </div>
      </header>

      {/* Profile Section */}
      <div className="flex items-center space-x-6 mb-10">
        <Image
          src={user.profileImage}
          alt="User profile"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h2 className="text-3xl font-semibold">{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      {/* Study Spots */}
      <div className="grid grid-cols-2 gap-6">
        {/* Liked Study Spots */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Liked Study Spots</h3>
          {likedSpots.map((spot, index) => (
            <div key={index} className="flex bg-[#1B263B] rounded-lg shadow-md p-4 mb-4">
              <Image src={spot.image} alt={spot.name} width={100} height={100} className="rounded-md" />
              <div className="ml-4">
                <h4 className="text-lg font-bold">{spot.name}</h4>
                <p>{spot.address}</p>
              </div>
            </div>
          ))}
          <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-md">Add a spot</button>
        </div>

        {/* Uploaded Study Spots */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Uploaded Study Spots</h3>
          {uploadedSpots.map((spot, index) => (
            <div key={index} className="flex bg-[#1B263B] rounded-lg shadow-md p-4 mb-4">
              <Image src={spot.image} alt={spot.name} width={100} height={100} className="rounded-md" />
              <div className="ml-4">
                <h4 className="text-lg font-bold">{spot.name}</h4>
                <p>{spot.address}</p>
              </div>
            </div>
          ))}

          <button
            onClick={handleLogout}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
