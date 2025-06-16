'use client';

import { useState, useEffect } from 'react'
import { GameHeader } from '@/components/GameHeader'
import { PuzzleArea } from '@/components/PuzzleArea'
import { BottomNavigation } from '@/components/BottomNavigation'
import { GameState } from '@/types/game'

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    energy: 100,
    maxEnergy: 100,
    mainCurrency: 0,
    experience: 0,
    blocksCompleted: 0,
    blocksRequired: 3,
  })

  const [currentView, setCurrentView] = useState<'game' | 'tasks' | 'leaderboard'>('game')

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#0f0f23] to-[#1a1a3a]">
      {/* Game Header */}
      <GameHeader gameState={gameState} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {currentView === 'game' && (
          <PuzzleArea gameState={gameState} updateGameState={updateGameState} />
        )}
        {currentView === 'tasks' && (
          <div className="p-4 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Tasks Coming Soon</h2>
            <p className="text-gray-400">Complete tasks to earn energy and rewards!</p>
          </div>
        )}
        {currentView === 'leaderboard' && (
          <div className="p-4 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Leaderboard Coming Soon</h2>
            <p className="text-gray-400">See how you rank against other players!</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  )
}