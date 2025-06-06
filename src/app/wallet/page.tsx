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
  
  const [showEnergyOptions, setShowEnergyOptions] = useState(false);
  const [showGoldOptions, setShowGoldOptions] = useState(false);
  
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
          {/* Wallet Balance */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Wallet</h2>
            
            <div className="grid grid-cols-3 gap-4">
              {/* Energy Balance */}
              <div 
                className="bg-blue-50 p-4 rounded-lg cursor-pointer"
                onClick={() => setShowEnergyOptions(!showEnergyOptions)}
              >
                <div className="flex items-center justify-center mb-2">
                  {renderCurrencyIcon('energy')}
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{balances.energy}</p>
                  <p className="text-xs text-gray-500">Energy</p>
                </div>
              </div>
              
              {/* Gold Balance */}
              <div 
                className="bg-yellow-50 p-4 rounded-lg cursor-pointer"
                onClick={() => setShowGoldOptions(!showGoldOptions)}
              >
                <div className="flex items-center justify-center mb-2">
                  {renderCurrencyIcon('gold')}
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{balances.gold}</p>
                  <p className="text-xs text-gray-500">Gold</p>
                </div>
              </div>
              
              {/* Special Balance */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {renderCurrencyIcon('special')}
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{balances.special}</p>
                  <p className="text-xs text-gray-500">Special</p>
                </div>
              </div>
            </div>
            
            {/* Energy Options */}
            {showEnergyOptions && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-3">Get More Energy</h3>
                <div className="space-y-2">
                  <button className="w-full py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Wait for Refill (8h)
                  </button>
                  <button className="w-full py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Watch Ad (+10 Energy)
                  </button>
                  <button className="w-full py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Convert Gold (50 Gold = 20 Energy)
                  </button>
                </div>
              </div>
            )}
            
            {/* Gold Options */}
            {showGoldOptions && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-3">Get More Gold</h3>
                <div className="space-y-2">
                  <button className="w-full py-2 bg-yellow-500 text-white rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Complete Tasks
                  </button>
                  <button className="w-full py-2 bg-yellow-500 text-white rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Watch Ad (+25 Gold)
                  </button>
                  <button className="w-full py-2 bg-yellow-500 text-white rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Invite Friends
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Transaction History */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
              <button className="text-sm text-blue-500">View All</button>
            </div>
            
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      transaction.type === 'earned' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
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
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {renderCurrencyIcon(transaction.currency)}
                    <span className={`ml-1 font-bold ${
                      transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Play & Earn</span>
              </button>
              <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg flex flex-col items-center">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Daily Tasks</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/wallet" />
    </>
  );
} 