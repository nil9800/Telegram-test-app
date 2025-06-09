'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { initTelegramApp, getTelegramUser } from '@/utils/telegram';
import { useNotification } from '@/utils/NotificationContext';
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
  level: number;
  avatar: string;
  online: boolean;
}

export default function FrensPage() {
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 1,
      name: 'Alex',
      level: 8,
      avatar: '/avatars/avatar1.png',
      online: true
    },
    {
      id: 2,
      name: 'Maria',
      level: 12,
      avatar: '/avatars/avatar2.png',
      online: false
    },
    {
      id: 3,
      name: 'John',
      level: 5,
      avatar: '/avatars/avatar3.png',
      online: true
    }
  ]);
  
  useEffect(() => {
    // Initialize Telegram WebApp
    initTelegramApp();
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      setUser(telegramUser);
    }
  }, []);

  const inviteFriend = () => {
    showNotification('Invitation link copied to clipboard!', 'success');
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pb-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="w-full max-w-md mx-auto">
        {/* Header with title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Frens</h1>
          <button 
            onClick={inviteFriend}
            className="btn-secondary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Invite
          </button>
        </div>

        {/* Friends list */}
        <div className="space-y-4 mb-6">
          {friends.map(friend => (
            <div key={friend.id} className="card glass-card">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mr-3 overflow-hidden">
                    {friend.avatar ? (
                      <Image 
                        src={friend.avatar} 
                        alt={friend.name} 
                        width={48} 
                        height={48} 
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold">{friend.name.charAt(0)}</span>
                    )}
                  </div>
                  {friend.online && (
                    <div className="absolute bottom-0 right-3 w-3 h-3 rounded-full bg-green-500 border-2 border-slate-800"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">{friend.name}</h2>
                    <div className="flex items-center bg-slate-800/50 rounded-full px-2 py-0.5">
                      <Image 
                        src="/icons/star_icon.svg" 
                        alt="Level" 
                        width={14} 
                        height={14} 
                        className="mr-1" 
                      />
                      <span className="text-xs font-medium">Level {friend.level}</span>
                    </div>
                  </div>
                  <div className="flex mt-1">
                    <button className="text-xs text-indigo-400 mr-3">Send Gift</button>
                    <button className="text-xs text-indigo-400">Challenge</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Find more friends card */}
        <div className="card glass-card bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
          <h2 className="text-lg font-bold mb-2">Find More Frens</h2>
          <p className="text-gray-400 text-sm mb-3">
            Invite your friends to join the app and earn rewards together!
          </p>
          <button 
            onClick={inviteFriend}
            className="btn-primary w-full"
          >
            Share Invitation Link
          </button>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation currentPath={pathname} />
    </main>
  );
}