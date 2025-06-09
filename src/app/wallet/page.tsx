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

interface Transaction {
  id: number;
  type: 'earn' | 'spend';
  amount: number;
  description: string;
  timestamp: Date;
}

export default function WalletPage() {
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [gold, setGold] = useState(450);
  const [energy, setEnergy] = useState(75);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'earn',
      amount: 50,
      description: 'Completed daily task',
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: 2,
      type: 'earn',
      amount: 100,
      description: 'Block game reward',
      timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    },
    {
      id: 3,
      type: 'spend',
      amount: 200,
      description: 'Purchased energy boost',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
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

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffMins < 24 * 60) {
      return `${Math.floor(diffMins / 60)} hr ago`;
    } else {
      return `${Math.floor(diffMins / (60 * 24))} days ago`;
    }
  };

  const purchaseEnergy = () => {
    if (gold >= 100) {
      setGold(prev => prev - 100);
      setEnergy(prev => Math.min(prev + 50, 100));
      
      const newTransaction = {
        id: transactions.length + 1,
        type: 'spend' as const,
        amount: 100,
        description: 'Purchased energy boost',
        timestamp: new Date()
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      showNotification('Energy purchased successfully!', 'success');
    } else {
      showNotification('Not enough gold!', 'error');
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pb-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="w-full max-w-md mx-auto">
        {/* Header with title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Your Wallet</h1>
          <p className="text-gray-400 text-sm">Manage your resources</p>
        </div>

        {/* Resources section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
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
        </div>

        {/* Purchase energy card */}
        <div className="card glass-card mb-6">
          <h2 className="text-lg font-bold mb-2">Need more energy?</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-sm">+50 Energy</div>
                <div className="flex items-center text-xs text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  100 Gold
                </div>
              </div>
            </div>
            <button 
              onClick={purchaseEnergy}
              className={`btn-primary ${gold < 100 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={gold < 100}
            >
              Purchase
            </button>
          </div>
        </div>

        {/* Transaction history */}
        <div className="card glass-card">
          <h2 className="text-lg font-bold mb-4">Transaction History</h2>
          <div className="space-y-3">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-slate-700/50 last:border-0">
                <div className="flex items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                    transaction.type === 'earn' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {transaction.type === 'earn' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{transaction.description}</div>
                    <div className="text-xs text-gray-400">{formatTime(transaction.timestamp)}</div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${
                  transaction.type === 'earn' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'earn' ? '+' : '-'}{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation currentPath={pathname} />
    </main>
  );
}