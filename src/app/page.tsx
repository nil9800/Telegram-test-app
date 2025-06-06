'use client';

import { useEffect, useState } from 'react';
import { initTelegramApp, getTelegramUser } from '@/utils/telegram';
import BottomNavigation from '@/components/BottomNavigation';
import Link from 'next/link';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface GameState {
  level: number;
  energy: number;
  maxEnergy: number;
  gold: number;
  progress: number;
  nextEnergyRefill: Date;
}

export default function Home() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    energy: 50,
    maxEnergy: 100,
    gold: 250,
    progress: 65,
    nextEnergyRefill: new Date(Date.now() + 3600000), // 1 hour from now
  });

  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
      setUser(telegramUser);
    }
  }, []);

  // Format time remaining until next energy refill
  const formatTimeRemaining = () => {
    const now = new Date();
    const diff = gameState.nextEnergyRefill.getTime() - now.getTime();
    if (diff <= 0) return "Ready";
    
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    return `${hours}h ${minutes}m`;
  };

  // If no Telegram user data is available, render nothing
  if (!user) return null;

  // Only render the app if we have Telegram user data
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] pb-16">
        <div className="w-full max-w-md">
          {/* User Stats Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-blue-500">
                  {user.first_name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold">{user.first_name}</p>
                <p className="text-xs text-gray-500">Level {gameState.level}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Energy */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                </svg>
                <span className="font-bold text-sm">{gameState.energy}/{gameState.maxEnergy}</span>
              </div>
              {/* Gold */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-sm">{gameState.gold}</span>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-gray-800">Level {gameState.level} Progress</h2>
              <span className="text-sm text-gray-500">{gameState.progress}%</span>
            </div>
            <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${gameState.progress}%` }}
              ></div>
              {/* Gift boxes on progress bar */}
              <div className="absolute top-0 left-0 h-full w-full flex items-center">
                <div className="absolute left-[25%] transform -translate-x-1/2">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                </div>
                <div className="absolute left-[50%] transform -translate-x-1/2">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                </div>
                <div className="absolute left-[75%] transform -translate-x-1/2">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Energy Refill Timer */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800">Energy Refill</h3>
                <p className="text-sm text-gray-500">Next refill in: {formatTimeRemaining()}</p>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Claim
              </button>
            </div>
          </div>

          {/* Game Actions */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <h2 className="font-bold text-gray-800 mb-3">Fun Block Mining</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/play" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Play Now</span>
              </Link>
              <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Daily Tasks</span>
              </button>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Get Energy</span>
              </button>
              <Link href="/friends" className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Invite Friends</span>
              </Link>
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-gray-800">Top Miners</h2>
              <button className="text-blue-500 text-sm">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { name: "Alex", level: 8, gold: 1250 },
                { name: "Sarah", level: 7, gold: 980 },
                { name: "Mike", level: 6, gold: 820 }
              ].map((player, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-blue-500">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-xs text-gray-500">Level {player.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-sm">{player.gold}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/" />
    </>
  );
} 