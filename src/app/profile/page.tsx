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

export default function ProfilePage() {
  const [user, setUser] = useState<TelegramUser | null>(null);

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
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-blue-500">
                {user.first_name.charAt(0)}
                {user.last_name ? user.last_name.charAt(0) : ''}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user.first_name} {user.last_name || ''}
            </h1>
            {user.username && (
              <p className="text-gray-500">@{user.username}</p>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Account Info</h2>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">User ID</span>
                  <span className="font-medium">{user.id}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Language</span>
                  <span className="font-medium">{user.language_code || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">App Activity</h2>
              <div className="space-y-2">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Joined</span>
                  <span className="font-medium">Today</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">Last Active</span>
                  <span className="font-medium">Now</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/profile" />
    </>
  );
} 