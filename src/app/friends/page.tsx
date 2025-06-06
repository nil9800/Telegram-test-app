'use client';

import React, { useEffect, useState } from 'react';
import { initTelegramApp, getTelegramUser, showMainButton } from '@/utils/telegram';
import BottomNavigation from '@/components/BottomNavigation';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface Friend {
  name: string;
  level: number;
  earnings: number;
  date: string;
  active: boolean;
}

export default function Friends() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [referralCode, setReferralCode] = useState('BLOCK' + Math.floor(1000 + Math.random() * 9000));
  const [totalEarnings, setTotalEarnings] = useState(120);
  const [friends, setFriends] = useState<Friend[]>([
    {
      name: 'Alex',
      level: 5,
      earnings: 50,
      date: '2023-10-15',
      active: true
    },
    {
      name: 'Maria',
      level: 3,
      earnings: 30,
      date: '2023-10-18',
      active: true
    },
    {
      name: 'John',
      level: 2,
      earnings: 20,
      date: '2023-10-20',
      active: false
    },
    {
      name: 'Sara',
      level: 4,
      earnings: 20,
      date: '2023-10-22',
      active: true
    }
  ]);

  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
      setUser(telegramUser);
    }
  }, []);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    // Show feedback
    const feedback = document.getElementById('copy-feedback');
    if (feedback) {
      feedback.classList.remove('opacity-0');
      setTimeout(() => {
        feedback.classList.add('opacity-0');
      }, 2000);
    }
  };

  const shareReferral = () => {
    if (typeof window !== 'undefined') {
      showMainButton('Share Referral', () => {
        const text = `Join me on Fun Block Mining! Use my referral code ${referralCode} to get bonus energy and gold. Download now!`;
        navigator.share({
          title: 'Join Fun Block Mining',
          text: text,
          url: 'https://t.me/funblockmining_bot'
        }).catch(err => console.error('Error sharing:', err));
      });
    }
  };

  // If no Telegram user data is available, render nothing
  if (!user) return null;

  // Only render the app if we have Telegram user data
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] pb-16">
        <div className="w-full max-w-md">
          {/* Referral Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Invite Friends & Earn</h2>
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-lg text-white mb-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm opacity-80">Your Referral Code</p>
                  <p className="text-2xl font-bold tracking-wider">{referralCode}</p>
                </div>
                <button 
                  onClick={copyReferralCode}
                  className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
              <div className="text-xs opacity-80">
                <p>Share this code with friends. You'll earn:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>20% of their energy earnings</li>
                  <li>10% of their gold earnings</li>
                  <li>5 energy for each friend who joins</li>
                </ul>
              </div>
            </div>
            <div id="copy-feedback" className="text-center text-green-600 text-sm mb-4 opacity-0 transition-opacity duration-300">
              Referral code copied to clipboard!
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={shareReferral}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share with Friends
              </button>
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-2">Your Referral Earnings</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <p className="text-xl font-bold">{totalEarnings} Gold</p>
                </div>
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                Claim
              </button>
            </div>
          </div>

          {/* Friends List */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Your Friends ({friends.length})</h3>
              <div className="text-sm text-gray-500">
                {friends.filter(f => f.active).length} active
              </div>
            </div>
            
            <div className="space-y-3">
              {friends.map((friend, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${friend.active ? 'bg-gray-50' : 'bg-gray-100'}`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${friend.active ? 'bg-blue-100 text-blue-500' : 'bg-gray-200 text-gray-500'}`}>
                      <span className="font-bold">{friend.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-xs text-gray-500">Level {friend.level} • Joined {friend.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-sm">{friend.earnings}</span>
                    </div>
                    <span className={`text-xs ${friend.active ? 'text-green-500' : 'text-gray-500'}`}>
                      {friend.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {friends.length === 0 && (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-500">No friends yet. Share your referral code to invite friends!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/friends" />
    </>
  );
} 