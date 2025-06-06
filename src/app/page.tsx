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

export default function Home() {
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

  // Only render the app if we have Telegram user data
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] pb-16">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome to Mini App
            </h1>
            <p className="text-lg text-gray-600">
              Hello, {user.first_name}!
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h2 className="font-semibold text-blue-800 mb-2">Featured Content</h2>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <h3 className="font-medium">Latest Updates</h3>
                  <p className="text-sm text-gray-600">Check out what's new in our app</p>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm">
                  <h3 className="font-medium">Popular Activities</h3>
                  <p className="text-sm text-gray-600">See what's trending right now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/" />
    </>
  );
} 