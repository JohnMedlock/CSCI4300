'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Simulated login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Optional: check localStorage for persistent login
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLogin === 'true');
  }, [pathname]); // ✅ Trigger re-check on route change

  // Save login state to localStorage
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/');
  };

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

        {isLoggedIn ? (
          <>
            <Link
              href="/user"
              className={`hover:underline ${
                pathname === '/user' ? 'font-semibold' : ''
              }`}
            >
              johndoe
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="bg-blue-500 px-4 py-1 rounded-md"
            >
              Login
            </button>
            <button
              onClick={handleLogin}
              className="bg-green-500 px-4 py-1 rounded-md"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
