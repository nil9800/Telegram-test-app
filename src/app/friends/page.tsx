'use client';

import { useEffect, useState } from 'react';
import { initTelegramApp, getTelegramUser } from '@/utils/telegram';
import BottomNavigation from '@/components/BottomNavigation';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: string;
}

export default function FriendsPage() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'online',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'offline',
      lastSeen: '2 hours ago',
    },
    {
      id: 3,
      name: 'Michael Brown',
      avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
      status: 'online',
    },
    {
      id: 4,
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      status: 'offline',
      lastSeen: '1 day ago',
    },
  ]);

  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
      setUser(telegramUser);
    }
  }, []);

  // If no Telegram user data is available, render nothing
  if (!user) return null;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] pb-16">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Friends</h1>
            <button className="bg-blue-500 text-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search friends..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="relative">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  ></span>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{friend.name}</h3>
                  <p className="text-sm text-gray-500">
                    {friend.status === 'online' ? 'Online' : `Last seen ${friend.lastSeen}`}
                  </p>
                </div>
                <button className="text-blue-500 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/friends" />
    </>
  );
} 