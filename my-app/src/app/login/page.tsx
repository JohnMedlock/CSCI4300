'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in:', formData);
  
    // Simulate login success
    localStorage.setItem('isLoggedIn', 'true');
  
    // ✅ Redirect to user profile page
    router.push('/user');
  };
  

  


  return (
    <main className="min-h-screen relative overflow-hidden">
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

        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0f172a] bg-opacity-90 p-8 rounded-2xl max-w-md w-full text-white shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b] text-white mb-4"
              required
            />

            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b] text-white mb-6"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#334155] hover:bg-[#475569] text-white py-2 rounded font-semibold transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

