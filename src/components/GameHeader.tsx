'use client'

import { GameState } from '@/types/game'
import { Zap, Coins, Star, Gift } from 'lucide-react'

interface GameHeaderProps {
  gameState: GameState
}

export function GameHeader({ gameState }: GameHeaderProps) {
  const progressPercentage = (gameState.blocksCompleted / gameState.blocksRequired) * 100

  return (
    <header className="p-4 bg-gradient-to-r from-[#1a1a3a] to-[#2d2d5a] shadow-lg">
      {/* Top Row - Level and Currency */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            <span className="text-white font-bold text-sm">Level {gameState.level}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Energy Display */}
          <div className="flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 mr-1 text-white" />
            <span className="text-white font-bold text-sm">
              {gameState.energy}/{gameState.maxEnergy}
            </span>
          </div>
          
          {/* Main Currency Display */}
          <div className="flex items-center bg-gradient-to-r from-yellow-600 to-orange-600 px-3 py-1 rounded-full">
            <Coins className="w-4 h-4 mr-1 text-white" />
            <span className="text-white font-bold text-sm">{gameState.mainCurrency}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar with Gift Boxes */}
      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Gift boxes along the progress bar */}
        <div className="absolute inset-0 flex justify-between items-center px-1">
          {[25, 50, 75, 100].map((milestone, index) => (
            <div
              key={milestone}
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                progressPercentage >= milestone
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-300'
                  : 'bg-gray-600 border-gray-500'
              }`}
            >
              <Gift className="w-3 h-3 text-white" />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Text */}
      <div className="text-center mt-2">
        <span className="text-sm text-gray-300">
          Blocks: {gameState.blocksCompleted}/{gameState.blocksRequired}
        </span>
      </div>
    </header>
  )
}