'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const email = localStorage.getItem('userEmail');
      const name = localStorage.getItem('userName');

      setLoggedIn(isLoggedIn);
      setUserName(name);

      if (isLoggedIn && email) {
        fetch('/api/user/profile', {
          headers: { 'x-user-email': email },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.name) {
              setUserName(data.name);
              localStorage.setItem('userName', data.name);
            }
          })
          .catch((err) => console.error('❌ Failed to fetch user:', err));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setLoggedIn(false);
    setUserName(null);
    router.push('/login');
  };

  const navItems = [
    { name: 'Map', href: '/map' },
    ...(loggedIn ? [{ name: 'Upload', href: '/upload' }] : []),
  ];

  if (loggedIn === null) return null;

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-2 sm:px-4 py-2 bg-white/10 backdrop-blur-lg text-white shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="h-8 w-8 object-contain"
        />
        <span className="text-lg font-bold">MyStudySpace</span>
      </Link>

      <div className="flex gap-4 items-center">
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
          <>
            <Link
              href="/user"
              className={`hover:underline ${
                pathname === '/user' ? 'font-semibold' : ''
              }`}
            >
              Welcome, {userName || 'User'}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white text-xs"
            >
              Logout
            </button>
          </>
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
