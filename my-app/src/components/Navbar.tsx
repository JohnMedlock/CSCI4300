'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Map', href: '/map' },
    { name: 'Saved', href: '/saved' },
    { name: 'Upload', href: '/upload' },
    { name: 'username', href: '/user' },
  ];

  return (
    <nav className="bg-[#354B74] text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold">
        MyStudySpace
      </Link>
      <div className="flex gap-6">
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
      </div>
    </nav>
  );
};

export default Navbar;

