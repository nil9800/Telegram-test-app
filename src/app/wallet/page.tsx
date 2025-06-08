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

interface Transaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  currency: 'energy' | 'gold' | 'special';
  description: string;
  timestamp: string;
}

export default function WalletPage() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [balances, setBalances] = useState({
    energy: 75,
    gold: 450,
    special: 2
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx1',
      type: 'earned',
      amount: 50,
      currency: 'gold',
      description: 'Completed block mining',
      timestamp: '2023-10-25 14:32'
    },
    {
      id: 'tx2',
      type: 'spent',
      amount: 25,
      currency: 'energy',
      description: 'Placed block pieces',
      timestamp: '2023-10-25 14:30'
    },
    {
      id: 'tx3',
      type: 'earned',
      amount: 100,
      currency: 'gold',
      description: 'Level completion bonus',
      timestamp: '2023-10-25 13:45'
    },
    {
      id: 'tx4',
      type: 'earned',
      amount: 20,
      currency: 'energy',
      description: 'Daily login reward',
      timestamp: '2023-10-25 10:15'
    },
    {
      id: 'tx5',
      type: 'earned',
      amount: 1,
      currency: 'special',
      description: 'Weekly task completion',
      timestamp: '2023-10-24 18:22'
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('balances');
  
  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
      setUser(telegramUser);
    }
  }, []);
  
  const renderCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'gold':
        return (
          <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
          </svg>
        );
      case 'energy':
        return (
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        );
      case 'special':
        return (
          <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
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
      <main className="flex min-h-screen flex-col items-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Wallet</h1>
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-white">
              {user.first_name ? user.first_name.charAt(0) : 'U'}
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex mb-6 bg-slate-800/50 rounded-xl p-1">
            <button 
              onClick={() => setActiveTab('balances')} 
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                activeTab === 'balances' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Balances
            </button>
            <button 
              onClick={() => setActiveTab('history')} 
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                activeTab === 'history' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              History
            </button>
            <button 
              onClick={() => setActiveTab('convert')} 
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                activeTab === 'convert' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Convert
            </button>
          </div>
          
          {/* Balances Tab */}
          {activeTab === 'balances' && (
            <div className="space-y-5">
              {/* Energy Balance */}
              <div className="dark-card resource-energy">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3">
                      {renderCurrencyIcon('energy')}
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Energy Balance</p>
                      <p className="text-2xl font-bold text-white">{balances.energy}</p>
                    </div>
                  </div>
                  <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 px-4 rounded-lg text-sm transition-colors">
                    Get More
                  </button>
                </div>
                
                <div className="progress-bar">
                  <div className="progress-bar-fill progress-bar-energy" style={{ width: `${balances.energy}%` }}></div>
                </div>
                <div className="text-xs text-blue-300/70 mt-1 text-right">
                  75/100
                </div>
              </div>
              
              {/* Gold Balance */}
              <div className="dark-card resource-gold">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mr-3">
                      {renderCurrencyIcon('gold')}
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Gold Balance</p>
                      <p className="text-2xl font-bold text-white">{balances.gold}</p>
                    </div>
                  </div>
                  <button className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 py-2 px-4 rounded-lg text-sm transition-colors">
                    Get More
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button className="py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-xs font-medium transition-colors">
                    Tasks
                  </button>
                  <button className="py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-xs font-medium transition-colors">
                    Watch Ad
                  </button>
                  <button className="py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-xs font-medium transition-colors">
                    Invite
                  </button>
                </div>
              </div>
              
              {/* Special Balance */}
              <div className="dark-card resource-special">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-3">
                      {renderCurrencyIcon('special')}
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Special Tokens</p>
                      <p className="text-2xl font-bold text-white">{balances.special}</p>
                    </div>
                  </div>
                  <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-2 px-4 rounded-lg text-sm transition-colors">
                    Use
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="dark-card">
              <h2 className="text-lg font-bold text-white mb-4">Transaction History</h2>
              
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        transaction.type === 'earned' ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'
                      }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {transaction.type === 'earned' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          )}
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white">{transaction.description}</p>
                        <p className="text-xs text-slate-400">{transaction.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {renderCurrencyIcon(transaction.currency)}
                      <span className={`ml-1 font-bold ${
                        transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Convert Tab */}
          {activeTab === 'convert' && (
            <div className="dark-card">
              <h2 className="text-lg font-bold text-white mb-4">Convert Currency</h2>
              
              <div className="space-y-4">
                <div className="bg-slate-700 p-4 rounded-xl border border-slate-600">
                  <h3 className="font-medium text-white mb-2">Gold to Energy</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mr-2">
                        {renderCurrencyIcon('gold')}
                      </div>
                      <span className="text-amber-300">50</span>
                    </div>
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-2">
                        {renderCurrencyIcon('energy')}
                      </div>
                      <span className="text-blue-300">20</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                    Convert
                  </button>
                </div>
                
                <div className="bg-slate-700 p-4 rounded-xl border border-slate-600">
                  <h3 className="font-medium text-white mb-2">Special to Gold</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-2">
                        {renderCurrencyIcon('special')}
                      </div>
                      <span className="text-purple-300">1</span>
                    </div>
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mr-2">
                        {renderCurrencyIcon('gold')}
                      </div>
                      <span className="text-amber-300">100</span>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm transition-colors">
                    Convert
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomNavigation currentPath="/wallet" />
    </>
  );
} 