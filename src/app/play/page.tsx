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
      <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] pb-16">
        <div className="w-full max-w-md">
          {/* User Stats Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="font-bold text-blue-500">
                  {user.first_name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold">{user.first_name}</p>
                <p className="text-xs text-gray-500">Level {gameState.level}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Energy */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                </svg>
                <span className="font-bold text-sm">{gameState.energy}/{gameState.maxEnergy}</span>
              </div>
              {/* Gold */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-sm">{gameState.gold}</span>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-gray-800">Level {gameState.level} Progress</h2>
              <span className="text-sm text-gray-500">{gameState.progress}%</span>
            </div>
            <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${gameState.progress}%` }}
              ></div>
              {/* Gift boxes on progress bar */}
              <div className="absolute top-0 left-0 h-full w-full flex items-center">
                <div className="absolute left-[33%] transform -translate-x-1/2">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                </div>
                <div className="absolute left-[66%] transform -translate-x-1/2">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Game Area */}
          {showGame ? (
            <div className="bg-white rounded-xl shadow-lg p-4 mb-4 overflow-hidden">
              <BlockGame 
                level={gameState.level} 
                onComplete={handleGameComplete} 
                onEnergyUse={handleEnergyUse}
                availableEnergy={gameState.energy}
              />
            </div>
          ) : showLevelInfo ? (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Level {gameState.level} Info</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Objective</h3>
                  <p className="text-gray-600">
                    Complete {gameState.level * 3} blocks to advance to the next level. 
                    Each block requires energy to place pieces in the correct position.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Rewards</h3>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">50 Gold per block</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                      </svg>
                      <span className="font-medium">10 Energy per block</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Energy Cost</h3>
                  <p className="text-gray-600">
                    Each piece placement costs {gameState.level * 5} energy.
                  </p>
                </div>
                
                <div className="pt-4">
                  <button 
                    onClick={handleStartGame}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Start Mining
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Fun Block Mining</h2>
              <p className="text-gray-600 mb-6">
                Arrange the block pieces in their correct positions to mine valuable resources. 
                Use your energy wisely to maximize your earnings!
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    <h3 className="font-medium text-gray-800">Energy</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Required to place blocks. Refills over time.
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                    <h3 className="font-medium text-gray-800">Gold</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Earned by completing blocks and levels.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleStartGame}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start Mining
                </button>
                <button 
                  onClick={handleShowLevelInfo}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Level Info
                </button>
              </div>
            </div>
          )}

          {/* Daily Tasks */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-gray-800">Daily Tasks</h2>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">2/5 completed</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Collect Energy</p>
                    <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-1">
                      <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Complete 3 Blocks</p>
                    <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-1">
                      <div className="h-1.5 bg-purple-500 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">1/3</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Daily Login</p>
                    <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-1">
                      <div className="h-1.5 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
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