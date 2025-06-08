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
  const [level, setLevel] = useState(5);
  const [levelProgress, setLevelProgress] = useState(60);
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
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back
              </h1>
              <p className="text-slate-400 text-sm">{user.first_name}!</p>
            </div>
            <Link href="/profile" className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-white">
              {user.first_name ? user.first_name.charAt(0) : 'U'}
            </Link>
          </div>
          
          {/* Level Progress */}
          <div className="dark-card mb-6">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Current Level</p>
                  <p className="text-xl font-bold text-white">{level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Progress</p>
                <p className="text-xl font-bold text-white">{levelProgress}%</p>
              </div>
            </div>
            
            <div className="progress-bar mb-1">
              <div className="progress-bar-fill progress-bar-level" style={{ width: `${levelProgress}%` }}></div>
            </div>
            
            <div className="flex justify-between text-xs text-slate-400">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
          </div>
          
          {/* Resources */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="resource-card resource-energy">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-blue-300">Energy</span>
                </div>
                <span className="text-lg font-bold text-blue-300">{energy}/100</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill progress-bar-energy" style={{ width: `${energy}%` }}></div>
              </div>
              <div className="text-xs text-blue-300/70 mt-1 text-right">
                Next in {formatTime(nextEnergyTime)}
              </div>
            </div>
            
            <div className="resource-card resource-gold">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-amber-300">Gold</span>
                </div>
                <span className="text-lg font-bold text-amber-300">{gold}</span>
              </div>
              <Link href="/wallet" className="w-full text-center block text-xs text-amber-200 mt-4 bg-amber-500/20 py-1.5 rounded-lg border border-amber-500/30 hover:bg-amber-500/30 transition-colors">
                View Wallet
              </Link>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="dark-card mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
            
            <Link 
              href="/play" 
              className="btn-primary block w-full mb-4"
            >
              Start Mining
            </Link>
            
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/task" 
                className="bg-slate-700 text-green-300 p-4 rounded-xl flex flex-col items-center border border-slate-600 hover:bg-slate-600 transition-colors"
              >
                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Daily Tasks</span>
              </Link>
              <Link 
                href="/friends" 
                className="bg-slate-700 text-blue-300 p-4 rounded-xl flex flex-col items-center border border-slate-600 hover:bg-slate-600 transition-colors"
              >
                <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Invite Friends</span>
              </Link>
            </div>
          </div>
          
          {/* Top Miners */}
          <div className="dark-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">Top Miners</h2>
              <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 text-amber-300 border border-amber-500/30">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-white">Alex</p>
                    <p className="text-xs text-amber-300">Level 15</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-amber-300">1,250</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center mr-3 text-slate-300 border border-slate-500">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-white">Maria</p>
                    <p className="text-xs text-slate-300">Level 14</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-slate-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-slate-300">1,120</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mr-3 text-orange-300 border border-orange-500/30">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-white">John</p>
                    <p className="text-xs text-orange-300">Level 13</p>
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