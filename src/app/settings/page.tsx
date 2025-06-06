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

export default function SettingsPage() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('english');

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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
          
          <div className="space-y-6">
            {/* Appearance Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Appearance</h2>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-500">Toggle dark theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Receive push notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Language Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Language</h2>
              <div className="p-3 bg-gray-50 rounded-lg">
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="russian">Russian</option>
                </select>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">About</h2>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Version 1.0.0</p>
                <p className="text-sm text-gray-500">© 2023 Telegram Mini App</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/settings" />
    </>
  );
} 