'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function ProfileInfo() {
  
  const router = useRouter();

  const handleLogout = () => {
    console.log('Logout clicked'); // ✅ Add this line
    localStorage.removeItem('isLoggedIn');
    setTimeout(() => {
      router.replace('/');
    }, 100);
  };
  


  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white p-6">
      {/* ... header and user info ... */}

      {/* Uploaded Study Spots section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Uploaded Study Spots</h3>

        {/* ... map through uploaded spots ... */}

        <button
          onClick={handleLogout}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
        >
        Logout
        </button>
        
      </div>
    </div>
  );
}
