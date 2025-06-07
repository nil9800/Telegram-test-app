'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
  const [energy, setEnergy] = useState(75);
  const [gold, setGold] = useState(450);
  const [nextEnergyTime, setNextEnergyTime] = useState(300); // 5 minutes in seconds
  
  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
      setUser(telegramUser);
    }
    
    // Energy timer
    const timer = setInterval(() => {
      setNextEnergyTime((prev) => {
        if (prev <= 1) {
          setEnergy(e => Math.min(e + 1, 100));
          return 300; // Reset to 5 minutes
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  // If no Telegram user data is available, render nothing
  if (!user) return null;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4">
        <div className="w-full max-w-md">
          {/* Welcome Card */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome, {user.first_name}!
                </h1>
                <p className="text-gray-300">Ready to mine some blocks?</p>
              </div>
              <Link href="/profile" className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-white border border-purple-500/30 glow">
                {user.first_name ? user.first_name.charAt(0) : 'U'}
              </Link>
            </div>
            
            {/* Resources */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="glass-effect p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-white">Energy</span>
                  </div>
                  <span className="text-lg font-bold text-white">{energy}/100</span>
                </div>
                <div className="w-full bg-blue-900/30 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full glow" 
                    style={{ width: `${energy}%` }}
                  ></div>
                </div>
                <div className="text-xs text-blue-300 mt-1 text-right">
                  Next in {formatTime(nextEnergyTime)}
                </div>
              </div>
              
              <div className="glass-effect p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-white">Gold</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-300">{gold}</span>
                </div>
                <Link href="/wallet" className="w-full text-center block text-xs text-yellow-200 mt-4 bg-yellow-500/20 py-1 rounded border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors">
                  View Wallet
                </Link>
              </div>
            </div>
            
            {/* Quick Actions */}
            <Link 
              href="/play" 
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium text-center mb-4 glow hover:from-blue-500 hover:to-purple-500 transition-all duration-300 border border-white/10"
            >
              Start Mining
            </Link>
            
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/task" 
                className="glass-effect text-green-300 p-4 rounded-lg flex flex-col items-center border border-green-500/20 hover:border-green-500/40 transition-colors"
              >
                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Daily Tasks</span>
              </Link>
              <Link 
                href="/friends" 
                className="glass-effect text-purple-300 p-4 rounded-lg flex flex-col items-center border border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Invite Friends</span>
              </Link>
            </div>
          </div>
          
          {/* Game Updates */}
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Game Updates</h2>
            
            <div className="space-y-4">
              <div className="p-4 glass-effect rounded-lg border border-blue-500/20">
                <h3 className="font-medium text-white">New Block Patterns</h3>
                <p className="text-sm text-blue-200 mb-2">
                  We've added 5 new block patterns for you to discover and mine!
                </p>
                <div className="flex justify-end">
                  <span className="text-xs text-blue-300">2 days ago</span>
                </div>
              </div>
              
              <div className="p-4 glass-effect rounded-lg border border-green-500/20">
                <h3 className="font-medium text-white">Daily Rewards Increased</h3>
                <p className="text-sm text-green-200 mb-2">
                  Complete daily tasks to earn 50% more gold and energy!
                </p>
                <div className="flex justify-end">
                  <span className="text-xs text-green-300">5 days ago</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Leaderboard Preview */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Top Miners</h2>
              <button className="text-sm text-blue-300 hover:text-blue-200 transition-colors">View All</button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 glass-effect rounded-lg border border-yellow-500/30">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/30 flex items-center justify-center mr-3 text-yellow-300 border border-yellow-400/30">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-white">Alex</p>
                    <p className="text-xs text-yellow-200">Level 15</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-yellow-300">1,250</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 glass-effect rounded-lg border border-gray-500/20">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-500/30 flex items-center justify-center mr-3 text-gray-300 border border-gray-400/30">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-white">Maria</p>
                    <p className="text-xs text-gray-300">Level 14</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-gray-300">1,120</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 glass-effect rounded-lg border border-orange-500/20">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-500/30 flex items-center justify-center mr-3 text-orange-300 border border-orange-400/30">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-white">John</p>
                    <p className="text-xs text-orange-200">Level 13</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-orange-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-orange-300">980</span>
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