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
  id: number;
  name: string;
  avatar: string;
  level: number;
  lastActive: string;
  isOnline: boolean;
}

export default function Friends() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [referralCode, setReferralCode] = useState('BLOCK123456');
  const [referralCount, setReferralCount] = useState(3);
  const [referralRewards, setReferralRewards] = useState({
    energy: 50,
    gold: 100,
    special: 1
  });
  
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      level: 12,
      lastActive: '2 hours ago',
      isOnline: true
    },
    {
      id: 2,
      name: 'Maria Garcia',
      avatar: 'https://i.pravatar.cc/150?img=5',
      level: 8,
      lastActive: '5 hours ago',
      isOnline: false
    },
    {
      id: 3,
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?img=3',
      level: 15,
      lastActive: '1 day ago',
      isOnline: false
    }
  ]);
  
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([
    {
      id: 4,
      name: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?img=4',
      level: 5,
      lastActive: 'Just now',
      isOnline: true
    }
  ]);
  
  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
      setUser(telegramUser);
    }
  }, []);
  
  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    // Show a toast or notification that the code was copied
  };
  
  const handleShareReferral = () => {
    // Implement sharing via Telegram
  };
  
  const handleAcceptFriendRequest = (id: number) => {
    const friendToAccept = pendingRequests.find(request => request.id === id);
    if (friendToAccept) {
      setFriends([...friends, friendToAccept]);
      setPendingRequests(pendingRequests.filter(request => request.id !== id));
    }
  };
  
  const handleRejectFriendRequest = (id: number) => {
    setPendingRequests(pendingRequests.filter(request => request.id !== id));
  };
  
  // If no Telegram user data is available, render nothing
  if (!user) return null;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4">
        <div className="w-full max-w-md">
          {/* Referral System */}
          <div className="dark-card mb-6">
            <h2 className="text-xl font-bold text-primary mb-4">Invite Friends</h2>
            
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg p-4 mb-6 text-white border border-blue-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="font-medium">Your Referral Code</h3>
                </div>
                <div className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-xs">
                  {referralCount} friends joined
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-800/30 rounded-lg p-2 mb-3">
                <span className="font-mono font-bold">{referralCode}</span>
                <button 
                  onClick={handleCopyReferralCode}
                  className="bg-gray-800 text-blue-300 p-1 rounded hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              
              <button 
                onClick={handleShareReferral}
                className="w-full bg-gray-800 text-blue-300 py-2 rounded-lg font-medium flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share with Friends
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-primary mb-2">Rewards per Referral</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-700 p-2 rounded flex items-center border border-gray-600">
                  <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-secondary">{referralRewards.energy} Energy</span>
                </div>
                <div className="bg-gray-700 p-2 rounded flex items-center border border-gray-600">
                  <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-secondary">{referralRewards.gold} Gold</span>
                </div>
                <div className="bg-gray-700 p-2 rounded flex items-center border border-gray-600">
                  <svg className="w-5 h-5 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                  <span className="text-sm font-medium text-secondary">{referralRewards.special} Special</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-secondary">
              Invite your friends to play and both of you will receive rewards! You'll also earn 10% commission on their gold earnings.
            </p>
          </div>
          
          {/* Friend Requests */}
          {pendingRequests.length > 0 && (
            <div className="dark-card mb-6">
              <h2 className="text-xl font-bold text-primary mb-4">Friend Requests</h2>
              
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
                    <div className="flex items-center">
                      <img 
                        src={request.avatar} 
                        alt={request.name} 
                        className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-600"
                      />
                      <div>
                        <p className="font-medium text-primary">{request.name}</p>
                        <p className="text-xs text-muted">Level {request.level}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleAcceptFriendRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700 text-white p-1 rounded transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleRejectFriendRequest(request.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-1 rounded transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Friends List */}
          <div className="dark-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">Your Friends</h2>
              <span className="text-sm bg-gray-700 text-secondary px-3 py-1 rounded-full border border-gray-600">
                {friends.length}
              </span>
            </div>
            
            {friends.length > 0 ? (
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
                    <div className="flex items-center">
                      <div className="relative">
                        <img 
                          src={friend.avatar} 
                          alt={friend.name} 
                          className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-600"
                        />
                        {friend.isOnline && (
                          <span className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-700"></span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-primary">{friend.name}</p>
                        <div className="flex items-center text-xs text-muted">
                          <span className="mr-2">Level {friend.level}</span>
                          <span>{friend.isOnline ? 'Online' : friend.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors">
                      Play Together
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-muted mb-4">You haven't added any friends yet</p>
                <button className="btn-primary">
                  Find Friends
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/friends" />
    </>
  );
} 