'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    setLoggedIn(isLoggedIn);

    const fetchUser = async () => {
      if (isLoggedIn && email) {
        try {
          const res = await fetch('/api/user/profile', {
            headers: { 'x-user-email': email },
          });
          const data = await res.json();
          setUser(data);
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

        {loggedIn && user ? (
          <Link
            href="/user"
            className={`hover:underline ${
              pathname === '/user' ? 'font-semibold' : ''
            }`}
          >
            {user.name || 'User'}
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

