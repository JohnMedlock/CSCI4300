'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const loggedIn = localStorage.getItem('isLoggedIn');

  // Simulate user state (replace this with real auth logic)
  const [user, setUser] = useState(null);

  // Example: fetch user from localStorage or an API on mount
  useEffect(() => {
    // Replace this with real authentication check
    const storedUser = null; // e.g., localStorage.getItem('user');
    setUser(storedUser);
  }, []);

  const navItems = [
    { name: 'Map', href: '/map' },
    { name: 'Saved', href: '/saved' },
    { name: 'Upload', href: '/upload' },
  ];

  return (
    <nav className="bg-[#354B74] text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold">
        MyStudySpace
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
            harry potter
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

