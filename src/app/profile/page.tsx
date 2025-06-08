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

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

interface Statistic {
  name: string;
  value: number | string;
  icon: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [level, setLevel] = useState(5);
  const [experience, setExperience] = useState(450);
  const [nextLevelExperience, setNextLevelExperience] = useState(1000);
  const [activeTab, setActiveTab] = useState('achievements');
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-block',
      name: 'First Block',
      description: 'Complete your first block',
      icon: 'puzzle',
      unlocked: true
    },
    {
      id: 'energy-master',
      name: 'Energy Master',
      description: 'Collect 500 energy',
      icon: 'lightning',
      unlocked: true
    },
    {
      id: 'gold-hoarder',
      name: 'Gold Hoarder',
      description: 'Collect 1000 gold',
      icon: 'gold',
      unlocked: false,
      progress: 450,
      total: 1000
    },
    {
      id: 'friend-network',
      name: 'Friend Network',
      description: 'Invite 5 friends',
      icon: 'users',
      unlocked: false,
      progress: 3,
      total: 5
    },
    {
      id: 'block-master',
      name: 'Block Master',
      description: 'Complete 50 blocks',
      icon: 'trophy',
      unlocked: false,
      progress: 12,
      total: 50
    }
  ]);
  
  const [statistics, setStatistics] = useState<Statistic[]>([
    {
      name: 'Blocks Completed',
      value: 12,
      icon: 'puzzle'
    },
    {
      name: 'Gold Earned',
      value: 450,
      icon: 'gold'
    },
    {
      name: 'Energy Used',
      value: 320,
      icon: 'lightning'
    },
    {
      name: 'Friends Invited',
      value: 3,
      icon: 'users'
    },
    {
      name: 'Time Played',
      value: '5h 23m',
      icon: 'time'
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
      case 'gold':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'trophy':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'time':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'settings':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
  
  // If no Telegram user data is available, render nothing
  if (!user) return null;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4">
        <div className="w-full max-w-md">
          {/* Profile Header */}
          <div className="dark-card mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {user.first_name ? user.first_name.charAt(0) : 'U'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {user.first_name} {user.last_name || ''}
                  </h2>
                  <p className="text-slate-400">@{user.username || 'user'}</p>
                </div>
              </div>
              <button className="p-2 bg-slate-700 rounded-lg text-slate-400 hover:bg-slate-600 transition-colors">
                {renderIcon('settings')}
              </button>
            </div>
            
            {/* Level Progress */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Level {level}</span>
                <span className="text-sm text-slate-400">{experience}/{nextLevelExperience} XP</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill progress-bar-level" 
                  style={{ width: `${(experience / nextLevelExperience) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex mb-6 bg-slate-800/50 rounded-xl p-1">
            <button 
              onClick={() => setActiveTab('achievements')} 
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                activeTab === 'achievements' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Achievements
            </button>
            <button 
              onClick={() => setActiveTab('stats')} 
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                activeTab === 'stats' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Statistics
            </button>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                activeTab === 'settings' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Settings
            </button>
          </div>
          
          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`dark-card ${
                    achievement.unlocked ? 'border-green-500/30 bg-green-500/5' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 ${
                      achievement.unlocked ? 'bg-green-500/20 text-green-400' : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {renderIcon(achievement.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-white">{achievement.name}</h3>
                        {achievement.unlocked && (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{achievement.description}</p>
                      
                      {!achievement.unlocked && achievement.progress !== undefined && (
                        <>
                          <div className="progress-bar">
                            <div 
                              className="progress-bar-fill bg-indigo-500" 
                              style={{ width: `${(achievement.progress / achievement.total!) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-end mt-1">
                            <span className="text-xs text-slate-400">
                              {achievement.progress}/{achievement.total}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Statistics Tab */}
          {activeTab === 'stats' && (
            <div className="dark-card">
              <h2 className="text-lg font-bold text-white mb-4">Your Statistics</h2>
              
              <div className="space-y-4">
                {statistics.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mr-3">
                        {renderIcon(stat.icon)}
                      </div>
                      <span className="text-white">{stat.name}</span>
                    </div>
                    <span className="font-bold text-indigo-400">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="dark-card">
              <h2 className="text-lg font-bold text-white mb-4">Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                  <span className="text-white">Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                  <span className="text-white">Sound Effects</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                  <span className="text-white">Dark Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors mt-2">
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomNavigation currentPath="/profile" />
    </>
  );
} 