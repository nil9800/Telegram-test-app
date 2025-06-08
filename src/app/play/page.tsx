'use client';

import { useEffect, useState } from 'react';
import { initTelegramApp, getTelegramUser } from '@/utils/telegram';
import BottomNavigation from '@/components/BottomNavigation';
import BlockGame from '@/components/BlockGame';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface GameState {
  level: number;
  energy: number;
  maxEnergy: number;
  gold: number;
  progress: number;
  blocksCompleted: number;
}

export default function PlayPage() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    energy: 50,
    maxEnergy: 100,
    gold: 250,
    progress: 0,
    blocksCompleted: 0
  });
  const [showGame, setShowGame] = useState(false);
  const [showLevelInfo, setShowLevelInfo] = useState(false);

  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
      setUser(telegramUser);
    }
  }, []);

  const handleStartGame = () => {
    setShowGame(true);
    setShowLevelInfo(false);
  };

  const handleShowLevelInfo = () => {
    setShowLevelInfo(true);
  };

  const handleGameComplete = () => {
    setShowGame(false);
    
    // Update game state
    setGameState(prev => {
      const blocksNeededForLevel = prev.level * 3;
      const newBlocksCompleted = prev.blocksCompleted + 1;
      const newProgress = Math.min(100, Math.floor((newBlocksCompleted / blocksNeededForLevel) * 100));
      
      // Check if level completed
      if (newBlocksCompleted >= blocksNeededForLevel) {
        return {
          level: prev.level + 1,
          energy: prev.energy + 20, // Bonus energy for level completion
          maxEnergy: prev.maxEnergy,
          gold: prev.gold + 100, // Bonus gold for level completion
          progress: 0,
          blocksCompleted: 0
        };
      }
      
      return {
        ...prev,
        gold: prev.gold + 50, // Gold for completing a block
        energy: prev.energy + 10, // Energy refill for completing a block
        progress: newProgress,
        blocksCompleted: newBlocksCompleted
      };
    });
  };

  const handleEnergyUse = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      energy: Math.max(0, prev.energy - amount)
    }));
  };

  // If no Telegram user data is available, render nothing
  if (!user) return null;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Play</h1>
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-white">
              {user.first_name ? user.first_name.charAt(0) : 'U'}
            </div>
          </div>

          {/* User Stats */}
          <div className="dark-card mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Energy */}
              <div className="bg-slate-700 p-3 rounded-xl border border-slate-600 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Energy</p>
                  <p className="text-lg font-bold text-blue-400">{gameState.energy}/{gameState.maxEnergy}</p>
                </div>
              </div>
              
              {/* Gold */}
              <div className="bg-slate-700 p-3 rounded-xl border border-slate-600 flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Gold</p>
                  <p className="text-lg font-bold text-amber-400">{gameState.gold}</p>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Level {gameState.level}</span>
                <span className="text-sm text-slate-400">{gameState.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill progress-bar-level" 
                  style={{ width: `${gameState.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                  <span className="text-xs text-slate-400">33%</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                  <span className="text-xs text-slate-400">66%</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-indigo-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                  <span className="text-xs text-slate-400">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Game Area */}
          {showGame ? (
            <div className="dark-card mb-6">
              <BlockGame 
                level={gameState.level} 
                onComplete={handleGameComplete} 
                onEnergyUse={handleEnergyUse}
                availableEnergy={gameState.energy}
              />
            </div>
          ) : showLevelInfo ? (
            <div className="dark-card mb-6">
              <h2 className="text-lg font-bold text-white mb-4">Level {gameState.level} Info</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-white mb-2">Objective</h3>
                  <p className="text-slate-300 text-sm">
                    Complete {gameState.level * 3} blocks to advance to the next level. 
                    Each block requires energy to place pieces in the correct position.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-2">Rewards</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700 p-3 rounded-xl border border-slate-600 flex items-center">
                      <svg className="w-5 h-5 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-white">50 Gold per block</span>
                    </div>
                    <div className="bg-slate-700 p-3 rounded-xl border border-slate-600 flex items-center">
                      <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-white">10 Energy per block</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-2">Level Completion</h3>
                  <div className="bg-slate-700 p-3 rounded-xl border border-slate-600 flex items-center">
                    <svg className="w-5 h-5 text-indigo-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                      <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                    </svg>
                    <span className="text-sm font-medium text-white">Special gift box at level completion</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowLevelInfo(false)} 
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            <div className="dark-card mb-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mr-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Level {gameState.level}</h2>
                  <p className="text-sm text-slate-400">Block Mining Challenge</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={handleStartGame} 
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                  Start Mining
                </button>
                
                <button 
                  onClick={handleShowLevelInfo} 
                  className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Level Info
                </button>
              </div>
            </div>
          )}
          
          {/* Previous Blocks */}
          <div className="dark-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">Recent Blocks</h2>
              <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mr-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">Block #12</p>
                    <p className="text-xs text-slate-400">Completed 2h ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-amber-400">+50</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded-xl border border-slate-600">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mr-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white">Block #11</p>
                    <p className="text-xs text-slate-400">Completed 5h ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-amber-400">+50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/play" />
    </>
  );
} 