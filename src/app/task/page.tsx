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

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
}

export default function TaskPage() {
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete your profile',
      description: 'Fill in all your profile details to earn a reward',
      reward: 50,
      completed: false
    },
    {
      id: 2,
      title: 'Play 3 games',
      description: 'Play the block game 3 times to earn a reward',
      reward: 100,
      completed: false
    },
    {
      id: 3,
      title: 'Invite a friend',
      description: 'Invite a friend to join the app and earn a reward',
      reward: 200,
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

  const completeTask = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      showNotification(`Task completed! You earned ${task.reward} gold`, 'success');
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pb-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="w-full max-w-md mx-auto">
        {/* Header with title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Daily Tasks</h1>
          <div className="flex items-center bg-slate-800/50 rounded-full px-3 py-1">
            <Image 
              src="/icons/star_icon.svg" 
              alt="Rewards" 
              width={16} 
              height={16} 
              className="mr-2" 
            />
            <span className="text-sm font-medium">Earn Rewards</span>
          </div>
        </div>

        {/* Task list */}
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="card glass-card">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold mb-1">{task.title}</h2>
                  <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                  <div className="flex items-center">
                    <Image 
                      src="/icons/wallet_icon.svg" 
                      alt="Gold" 
                      width={16} 
                      height={16} 
                      className="mr-1 text-yellow-500" 
                    />
                    <span className="text-sm font-medium text-yellow-500">{task.reward} Gold</span>
                  </div>
                </div>
                <button 
                  onClick={() => completeTask(task.id)}
                  className={`btn-primary ${task.completed ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  disabled={task.completed}
                >
                  {task.completed ? 'Completed' : 'Complete'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info card */}
        <div className="card glass-card mt-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
          <h2 className="text-lg font-bold mb-2">Complete tasks daily!</h2>
          <p className="text-gray-400 text-sm">
            New tasks are available every day. Complete them all to maximize your rewards.
          </p>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation currentPath={pathname} />
    </main>
  );
}