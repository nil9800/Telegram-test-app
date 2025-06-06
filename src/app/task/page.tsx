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

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  completed: boolean;
  claimed: boolean;
  reward: {
    type: 'energy' | 'gold' | 'special';
    amount: number;
  };
  icon: string;
}

export default function TaskPage() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [dailyTasks, setDailyTasks] = useState<Task[]>([
    {
      id: 'daily-login',
      title: 'Daily Login',
      description: 'Log in to the app',
      progress: 1,
      total: 1,
      completed: true,
      claimed: false,
      reward: { type: 'energy', amount: 20 },
      icon: 'calendar'
    },
    {
      id: 'mine-blocks',
      title: 'Mine Blocks',
      description: 'Complete 3 blocks',
      progress: 1,
      total: 3,
      completed: false,
      claimed: false,
      reward: { type: 'gold', amount: 50 },
      icon: 'puzzle'
    },
    {
      id: 'collect-energy',
      title: 'Collect Energy',
      description: 'Claim energy 2 times',
      progress: 1,
      total: 2,
      completed: false,
      claimed: false,
      reward: { type: 'energy', amount: 30 },
      icon: 'lightning'
    },
    {
      id: 'invite-friend',
      title: 'Invite Friends',
      description: 'Invite a friend to the app',
      progress: 0,
      total: 1,
      completed: false,
      claimed: false,
      reward: { type: 'special', amount: 1 },
      icon: 'users'
    }
  ]);

  const [weeklyTasks, setWeeklyTasks] = useState<Task[]>([
    {
      id: 'complete-levels',
      title: 'Complete Levels',
      description: 'Complete 2 levels',
      progress: 0,
      total: 2,
      completed: false,
      claimed: false,
      reward: { type: 'gold', amount: 200 },
      icon: 'trophy'
    },
    {
      id: 'daily-streak',
      title: 'Daily Streak',
      description: 'Log in for 5 consecutive days',
      progress: 1,
      total: 5,
      completed: false,
      claimed: false,
      reward: { type: 'energy', amount: 100 },
      icon: 'calendar'
    }
  ]);

  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
      setUser(telegramUser);
    }
  }, []);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };

  const renderRewardIcon = (type: 'energy' | 'gold' | 'special') => {
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

  const handleClaimReward = (taskId: string, isDaily: boolean) => {
    if (isDaily) {
      setDailyTasks(prev => prev.map(task => 
        task.id === taskId && task.completed 
          ? { ...task, claimed: true } 
          : task
      ));
    } else {
      setWeeklyTasks(prev => prev.map(task => 
        task.id === taskId && task.completed 
          ? { ...task, claimed: true } 
          : task
      ));
    }
  };

  // If no Telegram user data is available, render nothing
  if (!user) return null;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] pb-16">
        <div className="w-full max-w-md">
          {/* Daily Tasks */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Daily Tasks</h2>
              <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {dailyTasks.filter(task => task.completed).length}/{dailyTasks.length}
              </div>
            </div>
            
            <div className="space-y-4">
              {dailyTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-lg border ${
                    task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 ${
                      task.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {renderIcon(task.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">{task.title}</h3>
                        <div className="flex items-center">
                          {renderRewardIcon(task.reward.type)}
                          <span className="text-sm font-medium ml-1">{task.reward.amount}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${(task.progress / task.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {task.progress}/{task.total}
                        </span>
                        {task.completed && !task.claimed && (
                          <button 
                            onClick={() => handleClaimReward(task.id, true)}
                            className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                          >
                            Claim
                          </button>
                        )}
                        {task.completed && task.claimed && (
                          <span className="text-xs text-green-600 font-medium">Claimed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Weekly Tasks */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Weekly Tasks</h2>
              <div className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                {weeklyTasks.filter(task => task.completed).length}/{weeklyTasks.length}
              </div>
            </div>
            
            <div className="space-y-4">
              {weeklyTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-lg border ${
                    task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 ${
                      task.completed ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                    }`}>
                      {renderIcon(task.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">{task.title}</h3>
                        <div className="flex items-center">
                          {renderRewardIcon(task.reward.type)}
                          <span className="text-sm font-medium ml-1">{task.reward.amount}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-purple-500'}`}
                          style={{ width: `${(task.progress / task.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {task.progress}/{task.total}
                        </span>
                        {task.completed && !task.claimed && (
                          <button 
                            onClick={() => handleClaimReward(task.id, false)}
                            className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                          >
                            Claim
                          </button>
                        )}
                        {task.completed && task.claimed && (
                          <span className="text-xs text-green-600 font-medium">Claimed</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Task Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Task Rewards</h2>
            <p className="text-gray-600 mb-4">
              Complete tasks to earn rewards and progress in the game. Daily tasks reset every day at midnight, while weekly tasks reset every Monday.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  {renderRewardIcon('energy')}
                  <h3 className="font-medium text-gray-800 ml-2">Energy</h3>
                </div>
                <p className="text-xs text-gray-600">
                  Use energy to place blocks and mine resources.
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  {renderRewardIcon('gold')}
                  <h3 className="font-medium text-gray-800 ml-2">Gold</h3>
                </div>
                <p className="text-xs text-gray-600">
                  Spend gold on upgrades and special items.
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg col-span-2">
                <div className="flex items-center mb-2">
                  {renderRewardIcon('special')}
                  <h3 className="font-medium text-gray-800 ml-2">Special Rewards</h3>
                </div>
                <p className="text-xs text-gray-600">
                  Rare rewards that can be used for unique upgrades and bonuses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/task" />
    </>
  );
} 