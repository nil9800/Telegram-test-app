'use client';

import { useEffect, useState } from 'react';
import { initTelegramApp, getTelegramUser } from '@/utils/telegram';

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
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-[#2AABEE] to-[#229ED9]">
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
            <h2 className="font-semibold text-blue-800 mb-2">Available Features:</h2>
            <ul className="space-y-2">
              {['Quick Actions', 'User Profile', 'Settings', 'Help Center'].map((feature, index) => (
                <li 
                  key={index}
                  className="flex items-center p-2 hover:bg-blue-100 rounded-md cursor-pointer transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-200 rounded-full mr-3">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          Connected to Telegram
        </div>
      </div>
    </main>
  );
} 