'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { initTelegramApp, getTelegramUser } from '@/utils/telegram';
import { useNotification } from '@/utils/NotificationContext';
import BottomNavigation from '@/components/BottomNavigation';
import BlockGame from '@/components/BlockGame';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export default function Home() {
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [energy, setEnergy] = useState(75);
  const [gold, setGold] = useState(450);
  const [level, setLevel] = useState(5);
  const [levelProgress, setLevelProgress] = useState(60);
  const [nextEnergyTime, setNextEnergyTime] = useState(300); // 5 minutes in seconds
  const [showGame, setShowGame] = useState(false);
  const [dailyRewardAvailable, setDailyRewardAvailable] = useState(true);
  
  useEffect(() => {
    // Initialize Telegram WebApp
    initTelegramApp();
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      setUser(telegramUser);
    }

    // Simulate energy regeneration timer
    const timer = setInterval(() => {
      setNextEnergyTime((prev) => {
        if (prev <= 0) {
          setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 100));
          return 300; // Reset timer to 5 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayGame = () => {
    if (energy < 10) {
      showNotification('Not enough energy to play!', 'error');
      return;
    }
    // Deduct energy when starting the game
    setEnergy(prev => Math.max(prev - 10, 0));
    setShowGame(true);
  };

  const handleGameComplete = (success: boolean, goldEarned: number = 0) => {
    setShowGame(false);
    
    if (success) {
      setGold((prev) => prev + goldEarned);
      setLevelProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          setLevel((prevLevel) => prevLevel + 1);
          showNotification(`Level Up! You are now level ${level + 1}`, 'success');
          return 0;
        }
        return newProgress;
      });
      showNotification(`You earned ${goldEarned} gold!`, 'success');
    } else {
      showNotification('Game over! Try again.', 'info');
    }
  };

  const claimDailyReward = () => {
    setEnergy((prev) => Math.min(prev + 20, 100));
    setGold((prev) => prev + 100);
    setDailyRewardAvailable(false);
    setDailyRewardClaimed(new Date().toISOString());
    localStorage.setItem('dailyRewardClaimed', new Date().toISOString());
    showNotification('Daily reward claimed! +20 Energy, +100 Gold', 'success');
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pb-20 bg-gradient-to-b from-slate-900 to-slate-950">
      {showGame ? (
        <BlockGame onComplete={handleGameComplete} level={level} />
      ) : (
        <>
          <div className="w-full max-w-md mx-auto">
            {/* Header with user info and level */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
                  <span className="text-lg font-bold">{user?.first_name?.charAt(0) || 'P'}</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">{user?.first_name || 'Player'}</h1>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center bg-slate-800/50 rounded-full px-2 py-0.5">
                      <Image 
                        src="/icons/star_icon.svg" 
                        alt="Level" 
                        width={16} 
                        height={16} 
                        className="mr-1" 
                      />
                      <span className="text-xs font-medium">Level {level}</span>
                    </div>
                    <div className="ml-2 bg-slate-800 h-2 rounded-full w-24">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ width: `${levelProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="resource-card-energy">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-400">Energy</div>
                    <div className="text-xl font-bold">{energy}/100</div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="bg-slate-800 h-2 rounded-full">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${energy}%` }}
                    ></div>
                  </div>
                  {energy < 100 && (
                    <div className="text-xs text-gray-400 mt-1">
                      Next in {formatTime(nextEnergyTime)}
                    </div>
                  )}
                </div>
              </div>

              <div className="resource-card-gold">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-400">Gold</div>
                    <div className="text-xl font-bold">{gold}</div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Game section */}
            <div className="card glass-card mb-6">
              <h2 className="text-lg font-bold mb-3">Block Game</h2>
              <p className="text-gray-400 text-sm mb-4">
                Arrange the blocks to match the pattern and earn gold! Each game costs 10 energy.
              </p>
              <button 
                onClick={handlePlayGame}
                className={`btn-primary w-full ${energy < 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={energy < 10}
              >
                Play Now (10 Energy)
              </button>
            </div>

            {/* Daily reward section */}
            {dailyRewardAvailable && (
              <div className="card glass-card bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold mb-1">Daily Reward Available!</h2>
                    <p className="text-gray-400 text-sm">Claim your 100 gold bonus</p>
                  </div>
                  <button 
                    onClick={claimDailyReward}
                    className="btn-primary"
                  >
                    Claim
                  </button>
                </div>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="card glass-card mb-6">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/task" 
                  className="bg-slate-800/50 text-white p-4 rounded-xl flex flex-col items-center border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
                >
                  <Image 
                    src="/icons/checklist_icon.svg" 
                    alt="Tasks" 
                    width={24} 
                    height={24} 
                    className="mb-2" 
                  />
                  <span>Daily Tasks</span>
                </Link>
                <Link 
                  href="/friends" 
                  className="bg-slate-800/50 text-white p-4 rounded-xl flex flex-col items-center border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
                >
                  <Image 
                    src="/icons/friends_icon.svg" 
                    alt="Friends" 
                    width={24} 
                    height={24} 
                    className="mb-2" 
                  />
                  <span>Invite Frens</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <BottomNavigation currentPath={pathname} />
    </main>
  );
}