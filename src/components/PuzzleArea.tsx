'use client'

import { useState, useEffect } from 'react'
import { GameState, PuzzlePiece } from '@/types/game'
import { Play, RotateCcw } from 'lucide-react'

interface PuzzleAreaProps {
  gameState: GameState
  updateGameState: (updates: Partial<GameState>) => void
}

export function PuzzleArea({ gameState, updateGameState }: PuzzleAreaProps) {
  const [currentBlock, setCurrentBlock] = useState<PuzzlePiece[]>([])
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null)
  const [showComplete, setShowComplete] = useState(false)

  // Initialize a new block with random puzzle pieces
  const initializeBlock = () => {
    const pieces: PuzzlePiece[] = [
      { id: '1', x: 1, y: 1, targetX: 0, targetY: 0, isPlaced: false, energyCost: 5 },
      { id: '2', x: 3, y: 0, targetX: 1, targetY: 0, isPlaced: false, energyCost: 5 },
      { id: '3', x: 0, y: 3, targetX: 0, targetY: 1, isPlaced: false, energyCost: 5 },
      { id: '4', x: 2, y: 2, targetX: 1, targetY: 1, isPlaced: false, energyCost: 5 }
    ]
    setCurrentBlock(pieces)
    setShowComplete(false)
  }

  useEffect(() => {
    initializeBlock()
  }, [])

  const handlePiecePlacement = (pieceId: string, targetX: number, targetY: number) => {
    const piece = currentBlock.find(p => p.id === pieceId)
    if (!piece || piece.isPlaced || gameState.energy < piece.energyCost) {
      return
    }

    const updatedPieces = currentBlock.map(p => 
      p.id === pieceId 
        ? { ...p, x: targetX, y: targetY, isPlaced: true }
        : p
    )

    setCurrentBlock(updatedPieces)
    updateGameState({ energy: gameState.energy - piece.energyCost })

    // Check if block is complete
    const allPlaced = updatedPieces.every(p => 
      p.isPlaced && p.x === p.targetX && p.y === p.targetY
    )

    if (allPlaced) {
      setTimeout(() => {
        setShowComplete(true)
        const newBlocksCompleted = gameState.blocksCompleted + 1
        updateGameState({
          blocksCompleted: newBlocksCompleted,
          mainCurrency: gameState.mainCurrency + 50,
          experience: gameState.experience + 25
        })

        // Check if level is complete
        if (newBlocksCompleted >= gameState.blocksRequired) {
          setTimeout(() => {
            updateGameState({
              level: gameState.level + 1,
              blocksCompleted: 0,
              blocksRequired: gameState.blocksRequired + 1,
              maxEnergy: gameState.maxEnergy + 10,
              energy: gameState.maxEnergy + 10
            })
            initializeBlock()
          }, 2000)
        } else {
          setTimeout(() => {
            initializeBlock()
          }, 2000)
        }
      }, 500)
    }
  }

  return (
    <div className="flex-1 p-4 overflow-hidden">
      {/* Game Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gradient mb-2">LAMION</h1>
        <p className="text-gray-400">Arrange the pieces to complete the block</p>
      </div>

      {/* Target Grid */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3 text-center">Target Pattern</h3>
        <div className="grid grid-cols-2 gap-2 w-32 h-32 mx-auto">
          {Array.from({ length: 4 }, (_, index) => {
            const x = index % 2
            const y = Math.floor(index / 2)
            const piece = currentBlock.find(p => p.targetX === x && p.targetY === y)
            return (
              <div
                key={`target-${x}-${y}`}
                className="w-14 h-14 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: piece?.isPlaced ? '#10b981' : 'transparent' }}
              >
                {piece && (
                  <span className="text-white font-bold">{piece.id}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Puzzle Pieces */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3 text-center">Puzzle Pieces</h3>
        <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
          {currentBlock.map((piece) => (
            <div
              key={piece.id}
              className={`w-16 h-16 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                piece.isPlaced 
                  ? 'bg-green-600 border-green-400' 
                  : gameState.energy >= piece.energyCost
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-blue-400 hover:scale-105'
                  : 'bg-gray-600 border-gray-500 opacity-50 cursor-not-allowed'
              } border-2`}
              onClick={() => {
                if (!piece.isPlaced && gameState.energy >= piece.energyCost) {
                  handlePiecePlacement(piece.id, piece.targetX, piece.targetY)
                }
              }}
            >
              <span className="text-white font-bold text-lg">{piece.id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Energy Warning */}
      {gameState.energy < 5 && (
        <div className="text-center mb-4">
          <p className="text-yellow-400 text-sm">⚡ Not enough energy! Complete tasks to earn more.</p>
        </div>
      )}

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={initializeBlock}
          className="game-button flex items-center space-x-2 mx-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>New Block</span>
        </button>
      </div>

      {/* Completion Modal */}
      {showComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-6 rounded-2xl shadow-xl max-w-sm mx-4">
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-white mb-2">Block Complete!</h3>
              <p className="text-green-100 mb-4">+50 Coins • +25 XP</p>
              <div className="w-full bg-green-800 rounded-full h-2">
                <div className="bg-green-300 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}