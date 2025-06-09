'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import BottomNavigation from '@/components/BottomNavigation';
import { useNotification } from '@/utils/NotificationContext';
import { initTelegramApp, getTelegramUser, sendDataToBot } from '@/utils/telegram';

interface Friend {
  id: string;
  name: string;
  level: number;
  goldAmount: number;
  avatar: string;
  isOnline: boolean;
  lastActive?: string;
}

export default function FriendsPage() {
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [inviteLink, setInviteLink] = useState('https://t.me/share/url?url=Join%20me%20in%20Fun%20Block%20Mining!');
  
  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
    }
    
    // Mock friends data
    setFriends([
      {
        id: 'f1',
        name: 'Alex',
        level: 15,
        goldAmount: 1250,
        avatar: 'A',
        isOnline: true
      },
      {
        id: 'f2',
        name: 'Maria',
        level: 14,
        goldAmount: 1120,
        avatar: 'M',
        isOnline: false,
        lastActive: '2 hours ago'
      },
      {
        id: 'f3',
        name: 'John',
        level: 9,
        goldAmount: 780,
        avatar: 'J',
        isOnline: true
      },
      {
        id: 'f4',
        name: 'Sarah',
        level: 7,
        goldAmount: 520,
        avatar: 'S',
        isOnline: false,
        lastActive: '1 day ago'
      }
    ]);
  }, []);
  
  const handleInvite = () => {
    // In a real app, this would generate a unique invite link
    if (typeof window !== 'undefined') {
      if (window.Telegram?.WebApp) {
        // Try to use Telegram's built-in sharing
        sendDataToBot({ action: 'share_invite' });
        showNotification('Invite sent successfully!', 'success');
      } else {
        // Fallback to clipboard copy
        navigator.clipboard.writeText(inviteLink)
          .then(() => {
            showNotification('Invite link copied to clipboard!', 'success');
          })
          .catch(() => {
            showNotification('Failed to copy invite link', 'error');
          });
      }
    }
  };
  
  const handleSendGift = (friendId: string, friendName: string) => {
    showNotification(`Gift sent to ${friendName}!`, 'success');
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Friends</h1>
        </div>
        
        {/* Invite Card */}
        <div className="dark-card mb-6 bg-gradient-to-br from-indigo-900/50 to-indigo-800/30 border-indigo-700/50">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500/30 flex items-center justify-center text-indigo-300 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Invite Friends</h2>
              <p className="text-sm text-indigo-300">Earn 100 gold for each friend who joins!</p>
            </div>
          </div>
          
          <button 
            onClick={handleInvite}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Invite Link
          </button>
        </div>
        
        {/* Friends List */}
        <div className="dark-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Your Friends</h2>
            <span className="text-sm text-indigo-400">{friends.length} friends</span>
          </div>
          
          {friends.length > 0 ? (
            <div className="space-y-3">
              {friends.map(friend => (
                <div key={friend.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-white">
                        {friend.avatar}
                      </div>
                      {friend.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-700"></div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-white flex items-center">
                        {friend.name}
                        <span className="ml-2 text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">
                          Lvl {friend.level}
                        </span>
                      </p>
                      <p className="text-xs text-slate-400 flex items-center">
                        <svg className="w-3 h-3 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                        {friend.goldAmount} • 
                        {friend.isOnline ? (
                          <span className="text-green-400 ml-1">Online</span>
                        ) : (
                          <span className="text-slate-500 ml-1">{friend.lastActive}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleSendGift(friend.id, friend.name)}
                    className="text-xs bg-slate-600 hover:bg-slate-500 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Send Gift
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Friends Yet</h3>
              <p className="text-slate-400 text-sm mb-4">Invite your friends to join the game!</p>
              <button 
                onClick={handleInvite}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Invite Friends
              </button>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation currentPath={pathname} />
    </main>
  );
} 