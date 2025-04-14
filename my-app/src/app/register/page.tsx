'use client';

import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    major: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering:', formData);
    // TODO: Send data to API
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
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

        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0f172a] bg-opacity-90 p-8 rounded-2xl max-w-md w-full text-white shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Display name"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b] text-white mb-4"
              required
            />

            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
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
              className="w-full p-2 rounded bg-[#1e293b] text-white mb-4"
              required
            />

            <label className="block text-sm font-medium mb-1">Major</label>
            <select
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#1e293b] text-white mb-6"
              required
            >
              <option value="">Field of study</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Psychology">Psychology</option>
              {/* Add more as needed */}
            </select>

            <button
              type="submit"
              className="w-full bg-[#334155] hover:bg-[#475569] text-white py-2 rounded font-semibold transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

