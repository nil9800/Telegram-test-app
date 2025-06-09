'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type NavItem = {
  name: string;
  path: string;
  iconSrc: string;
};

export default function BottomNavigation({ currentPath }: { currentPath: string }) {
  const navItems: NavItem[] = [
    {
      name: 'Home',
      path: '/',
      iconSrc: '/icons/home_icon.svg',
    },
    {
      name: 'Task',
      path: '/task',
      iconSrc: '/icons/checklist_icon.svg',
    },
    {
      name: 'Frens',
      path: '/friends',
      iconSrc: '/icons/friends_icon.svg',
    },
    {
      name: 'Wallet',
      path: '/wallet',
      iconSrc: '/icons/wallet_icon.svg',
    },
    {
      name: 'Profile',
      path: '/profile',
      iconSrc: '/icons/profile_icon.svg',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 z-50 shadow-lg">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`nav-item ${
              currentPath === item.path
                ? 'nav-item-active'
                : 'nav-item-inactive'
            }`}
          >
            <div className={`p-1.5 ${currentPath === item.path ? 'bg-indigo-500/10 rounded-xl' : ''}`}>
              <Image 
                src={item.iconSrc} 
                alt={item.name} 
                width={24} 
                height={24} 
                className={`${currentPath === item.path ? 'opacity-100' : 'opacity-65'}`}
              />
            </div>
            <span className="text-xs mt-1 font-medium">{item.name}</span>
            {currentPath === item.path && (
              <div className="absolute -bottom-0 w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}