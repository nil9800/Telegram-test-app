'use client';

import { useEffect, useState } from 'react';
import { initTelegramApp, getTelegramUser } from '@/utils/telegram';
import BottomNavigation from '@/components/BottomNavigation';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface UserStats {
  level: number;
  totalGold: number;
  totalEnergy: number;
  blocksCompleted: number;
  levelsCompleted: number;
  energySpent: number;
  daysPlayed: number;
  joinDate: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward: {
    type: 'gold' | 'energy' | 'special';
    amount: number;
  };
}

export default function ProfilePage() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    level: 5,
    totalGold: 1250,
    totalEnergy: 350,
    blocksCompleted: 47,
    levelsCompleted: 4,
    energySpent: 280,
    daysPlayed: 3,
    joinDate: '2023-10-20',
  });
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_block',
      name: 'Block Builder',
      description: 'Complete your first block',
      icon: 'puzzle',
      progress: 1,
      maxProgress: 1,
      completed: true,
      reward: { type: 'gold', amount: 50 }
    },
    {
      id: 'energy_saver',
      name: 'Energy Saver',
      description: 'Collect energy 5 times',
      icon: 'lightning',
      progress: 3,
      maxProgress: 5,
      completed: false,
      reward: { type: 'energy', amount: 20 }
    },
    {
      id: 'level_master',
      name: 'Level Master',
      description: 'Complete 10 levels',
      icon: 'trophy',
      progress: 4,
      maxProgress: 10,
      completed: false,
      reward: { type: 'gold', amount: 200 }
    },
    {
      id: 'social_miner',
      name: 'Social Miner',
      description: 'Invite 3 friends',
      icon: 'users',
      progress: 1,
      maxProgress: 3,
      completed: false,
      reward: { type: 'special', amount: 1 }
    },
    {
      id: 'daily_streak',
      name: 'Daily Streak',
      description: 'Play for 7 consecutive days',
      icon: 'calendar',
      progress: 3,
      maxProgress: 7,
      completed: false,
      reward: { type: 'gold', amount: 150 }
    }
  ]);

  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
      setUser(telegramUser);
    }
  }, []);

  const renderAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'puzzle':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        );
      case 'lightning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'trophy':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
    }
  };

  const renderRewardIcon = (type: 'gold' | 'energy' | 'special') => {
    switch (type) {
      case 'gold':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
          </svg>
        );
      case 'energy':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        );
      case 'special':
        return (
          <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // If no Telegram user data is available, render nothing
  if (!user) return null;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] pb-16">
        <div className="w-full max-w-md">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-blue-500">
                  {user.first_name.charAt(0)}
                  {user.last_name ? user.last_name.charAt(0) : ''}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user.first_name} {user.last_name || ''}
              </h1>
              {user.username && (
                <p className="text-gray-500 mb-2">@{user.username}</p>
              )}
              
              <div className="flex items-center mt-2">
                <div className="flex items-center bg-blue-100 rounded-full px-3 py-1">
                  <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-blue-700">Level {userStats.level} Miner</span>
                </div>
              </div>
            </div>
            
            {/* User Stats Summary */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500">Gold</p>
                <p className="font-bold text-yellow-500">{userStats.totalGold}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500">Energy</p>
                <p className="font-bold text-blue-500">{userStats.totalEnergy}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-500">Blocks</p>
                <p className="font-bold text-purple-500">{userStats.blocksCompleted}</p>
              </div>
            </div>
          </div>
          
          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Achievements</h2>
              <span className="text-sm text-gray-500">
                {achievements.filter(a => a.completed).length}/{achievements.length}
              </span>
            </div>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-lg border ${
                    achievement.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 ${
                      achievement.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {renderAchievementIcon(achievement.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">{achievement.name}</h3>
                        <div className="flex items-center">
                          {renderRewardIcon(achievement.reward.type)}
                          <span className="text-sm font-medium ml-1">{achievement.reward.amount}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{achievement.description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${achievement.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                        {achievement.completed && (
                          <span className="text-xs text-green-600 font-medium">Completed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Game Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mining Stats</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Levels Completed</span>
                <span className="font-medium">{userStats.levelsCompleted}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Blocks Mined</span>
                <span className="font-medium">{userStats.blocksCompleted}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Energy Spent</span>
                <span className="font-medium">{userStats.energySpent}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Days Played</span>
                <span className="font-medium">{userStats.daysPlayed}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500">Joined</span>
                <span className="font-medium">{userStats.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/profile" />
    </>
  );
} 