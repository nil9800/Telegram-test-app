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

interface Achievement {
  id: number;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  reward: number;
  completed: boolean;
}

export default function ProfilePage() {
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [level, setLevel] = useState(5);
  const [levelProgress, setLevelProgress] = useState(60);
  const [gold, setGold] = useState(450);
  const [energy, setEnergy] = useState(75);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: 'Block Master',
      description: 'Complete 10 block games',
      progress: 7,
      maxProgress: 10,
      reward: 200,
      completed: false
    },
    {
      id: 2,
      title: 'Social Butterfly',
      description: 'Invite 5 friends',
      progress: 2,
      maxProgress: 5,
      reward: 300,
      completed: false
    },
    {
      id: 3,
      title: 'Daily Streak',
      description: 'Log in for 7 consecutive days',
      progress: 5,
      maxProgress: 7,
      reward: 150,
      completed: false
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

  const claimAchievement = (achievementId: number) => {
    setAchievements(prevAchievements => 
      prevAchievements.map(achievement => 
        achievement.id === achievementId && achievement.progress >= achievement.maxProgress
          ? { ...achievement, completed: true }
          : achievement
      )
    );
    
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && achievement.progress >= achievement.maxProgress) {
      setGold(prev => prev + achievement.reward);
      showNotification(`Achievement completed! You earned ${achievement.reward} gold`, 'success');
    } else {
      showNotification('Achievement not yet completed', 'error');
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pb-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="w-full max-w-md mx-auto">
        {/* Profile header */}
        <div className="card glass-card mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center mr-4">
              <span className="text-2xl font-bold">{user?.first_name?.charAt(0) || 'P'}</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">{user?.first_name || 'Player'} {user?.last_name || ''}</h1>
              <div className="flex items-center mt-1">
                <div className="flex items-center bg-slate-800/50 rounded-full px-2 py-0.5 mr-2">
                  <Image 
                    src="/icons/star_icon.svg" 
                    alt="Level" 
                    width={16} 
                    height={16} 
                    className="mr-1" 
                  />
                  <span className="text-xs font-medium">Level {level}</span>
                </div>
                <div className="text-xs text-gray-400">ID: {user?.id || '12345678'}</div>
              </div>
              <div className="mt-2 bg-slate-800 h-2 rounded-full w-full">
                <div 
                  className="bg-indigo-500 h-2 rounded-full" 
                  style={{ width: `${levelProgress}%` }}
                ></div>
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

        {/* Achievements section */}
        <h2 className="text-xl font-bold mb-4">Achievements</h2>
        <div className="space-y-4">
          {achievements.map(achievement => (
            <div key={achievement.id} className="card glass-card">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                  <div className="flex items-center text-sm text-yellow-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {achievement.reward} Gold
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full" 
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {achievement.progress}/{achievement.maxProgress} completed
                  </div>
                </div>
                {achievement.progress >= achievement.maxProgress && !achievement.completed && (
                  <button 
                    onClick={() => claimAchievement(achievement.id)}
                    className="btn-primary h-10"
                  >
                    Claim
                  </button>
                )}
                {achievement.completed && (
                  <div className="flex items-center text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Claimed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation currentPath={pathname} />
    </main>
  );
}