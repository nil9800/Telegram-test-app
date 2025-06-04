'use client';

import { useEffect } from 'react';
import { initTelegramApp, getTelegramUser, showMainButton } from '@/utils/telegram';

export default function Home() {
  useEffect(() => {
    initTelegramApp();
    const user = getTelegramUser();
    if (user) {
      showMainButton('Open Menu', () => {
        console.log('Button clicked by:', user.first_name);
      });
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Telegram Mini App
        </h1>
        <p className="text-lg mb-8">
          {getTelegramUser()?.first_name ? `Hello, ${getTelegramUser()?.first_name}!` : 'Loading...'}
        </p>
        <div className="grid gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h2 className="font-semibold">Mini App Features:</h2>
            <ul className="list-disc list-inside mt-2">
              <li>Telegram Web App Integration</li>
              <li>User Information Access</li>
              <li>Main Button Control</li>
              <li>Data Exchange with Bot</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
} 