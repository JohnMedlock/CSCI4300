'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');

    setLoggedIn(isLoggedIn);
    setUserName(name); // Instant load on first render

    const fetchUser = async () => {
      if (isLoggedIn && email) {
        try {
          const res = await fetch('/api/user/profile', {
            headers: { 'x-user-email': email },
          });
          const data = await res.json();
          setUserName(data.name);
          localStorage.setItem('userName', data.name); // Keep it fresh
        } catch (err) {
          console.error('Failed to fetch user:', err);
        }
      }
    };

    fetchUser();
  }, []);

  const navItems = [
    { name: 'Map', href: '/map' },
    { name: 'Upload', href: '/upload' },
  ];

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-4 sm:px-6 py-3 bg-white/10 backdrop-blur-lg text-white shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-xl font-bold">MyStudySpace</span>
      </Link>

      <div className="flex gap-6 items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`hover:underline ${
              pathname === item.href ? 'font-semibold' : ''
            }`}
          >
            {item.name}
          </Link>
        ))}

        {loggedIn ? (
          <Link
            href="/user"
            className={`hover:underline ${
              pathname === '/user' ? 'font-semibold' : ''
            }`}
          >
            {userName || 'User'}
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className={`hover:underline ${
                pathname === '/login' ? 'font-semibold' : ''
              }`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`hover:underline ${
                pathname === '/register' ? 'font-semibold' : ''
              }`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
