'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import BottomNavigation from '@/components/BottomNavigation';
import { useNotification } from '@/utils/NotificationContext';
import { initTelegramApp, getTelegramUser, showMainButton } from '@/utils/telegram';

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  reward: number;
}

export default function TaskPage() {
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState<'daily' | 'achievements'>('daily');
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  
  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
    }
    
    // Load tasks
    setDailyTasks([
      {
        id: 'task1',
        title: 'Mine 5 blocks',
        description: 'Complete 5 mining sessions',
        reward: 50,
        progress: 2,
        maxProgress: 5,
        completed: false
      },
      {
        id: 'task2',
        title: 'Collect energy',
        description: 'Collect full energy (100/100)',
        reward: 30,
        progress: 75,
        maxProgress: 100,
        completed: false
      },
      {
        id: 'task3',
        title: 'Invite a friend',
        description: 'Invite one friend to the game',
        reward: 100,
        progress: 0,
        maxProgress: 1,
        completed: false
      },
      {
        id: 'task4',
        title: 'Reach level 6',
        description: 'Upgrade your miner to level 6',
        reward: 200,
        progress: 5,
        maxProgress: 6,
        completed: false
      }
    ]);
    
    // Load achievements
    setAchievements([
      {
        id: 'ach1',
        title: 'Beginner Miner',
        description: 'Mine your first block',
        icon: '⛏️',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        reward: 50
      },
      {
        id: 'ach2',
        title: 'Block Master',
        description: 'Mine 50 blocks in total',
        icon: '🏆',
        progress: 12,
        maxProgress: 50,
        unlocked: false,
        reward: 200
      },
      {
        id: 'ach3',
        title: 'Social Butterfly',
        description: 'Invite 5 friends to the game',
        icon: '🦋',
        progress: 0,
        maxProgress: 5,
        unlocked: false,
        reward: 300
      },
      {
        id: 'ach4',
        title: 'Gold Hoarder',
        description: 'Collect 1000 gold',
        icon: '💰',
        progress: 450,
        maxProgress: 1000,
        unlocked: false,
        reward: 250
      },
      {
        id: 'ach5',
        title: 'Energy Master',
        description: 'Reach maximum energy 10 times',
        icon: '⚡',
        progress: 3,
        maxProgress: 10,
        unlocked: false,
        reward: 150
      }
    ]);
  }, []);
  
  const completeTask = (taskId: string) => {
    setDailyTasks(prev => 
      prev.map(task => 
        task.id === taskId ? 
          { ...task, completed: true } : 
          task
      )
    );
    
    const task = dailyTasks.find(t => t.id === taskId);
    if (task) {
      showNotification(`Completed: ${task.title}! +${task.reward} Gold`, 'success');
    }
  };
  
  const claimAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && achievement.progress >= achievement.maxProgress && !achievement.unlocked) {
      setAchievements(prev => 
        prev.map(a => 
          a.id === achievementId ? 
            { ...a, unlocked: true } : 
            a
        )
      );
      
      showNotification(`Achievement unlocked: ${achievement.title}! +${achievement.reward} Gold`, 'success');
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Tasks & Achievements</h1>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex mb-6 bg-slate-800 rounded-lg p-1">
          <button 
            className={`flex-1 py-2 px-4 rounded-md text-center ${
              activeTab === 'daily' 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('daily')}
          >
            Daily Tasks
          </button>
          <button 
            className={`flex-1 py-2 px-4 rounded-md text-center ${
              activeTab === 'achievements' 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
        </div>
        
        {/* Daily Tasks */}
        {activeTab === 'daily' && (
          <div className="space-y-4">
            {dailyTasks.map(task => (
              <div key={task.id} className="dark-card">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-white">{task.title}</h3>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                    <span className="text-amber-300 font-bold">+{task.reward}</span>
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm mb-3">{task.description}</p>
                
                <div className="mb-3">
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill bg-indigo-500" 
                      style={{ width: `${(task.progress / task.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>{task.progress}/{task.maxProgress}</span>
                    <span>{Math.round((task.progress / task.maxProgress) * 100)}%</span>
                  </div>
                </div>
                
                <button 
                  className={`w-full py-2 px-4 rounded-lg text-center text-sm font-medium ${
                    task.progress >= task.maxProgress && !task.completed
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : task.completed
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                  onClick={() => task.progress >= task.maxProgress && !task.completed && completeTask(task.id)}
                  disabled={task.progress < task.maxProgress || task.completed}
                >
                  {task.completed ? 'Completed' : task.progress >= task.maxProgress ? 'Claim Reward' : 'In Progress'}
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Achievements */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            {achievements.map(achievement => (
              <div key={achievement.id} className={`dark-card ${achievement.unlocked ? 'border-amber-500/50' : ''}`}>
                <div className="flex items-center mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 ${
                    achievement.unlocked ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700 text-slate-500'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white flex items-center">
                      {achievement.title}
                      {achievement.unlocked && (
                        <svg className="w-4 h-4 text-amber-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </h3>
                    <p className="text-slate-400 text-sm">{achievement.description}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="progress-bar">
                    <div 
                      className={`progress-bar-fill ${achievement.unlocked ? 'bg-amber-500' : 'bg-indigo-500'}`}
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                    <div className="flex items-center">
                      <svg className="w-3 h-3 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                      <span className="text-amber-300">{achievement.reward}</span>
                    </div>
                  </div>
                </div>
                
                {achievement.progress >= achievement.maxProgress && !achievement.unlocked && (
                  <button 
                    className="w-full py-2 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-center text-sm font-medium"
                    onClick={() => claimAchievement(achievement.id)}
                  >
                    Claim Achievement
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <BottomNavigation currentPath={pathname} />
    </main>
  );
} 