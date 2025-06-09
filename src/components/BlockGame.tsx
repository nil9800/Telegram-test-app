'use client';

import React, { useState, useEffect } from 'react';

interface BlockPiece {
  id: number;
  position: { x: number; y: number };
  correctPosition: { x: number; y: number };
  color: string;
  isPlaced: boolean;
  shape: 'square' | 'rectangle' | 'lShape' | 'tShape';
}

interface BlockGameProps {
  level: number;
  onComplete: (success: boolean, goldEarned?: number) => void;
  onEnergyUse?: (amount: number) => void;
  availableEnergy?: number;
}

const BlockGame: React.FC<BlockGameProps> = ({ 
  level, 
  onComplete, 
  onEnergyUse = () => {},
  availableEnergy = 100 
}) => {
  const [pieces, setPieces] = useState<BlockPiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [energyRequired, setEnergyRequired] = useState(5);
  const [message, setMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Generate block pieces based on level
  useEffect(() => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-pink-500'];
    const shapes = ['square', 'rectangle', 'lShape', 'tShape'];
    const numPieces = Math.min(3 + level, 8); // Increase pieces with level, max 8
    
    setEnergyRequired(level * 5); // Energy cost increases with level
    
    const newPieces: BlockPiece[] = [];
    
    // Create pieces with random positions but defined correct positions
    for (let i = 0; i < numPieces; i++) {
      // Random position within the game board
      const randomX = Math.floor(Math.random() * 80);
      const randomY = Math.floor(Math.random() * 80);
      
      // Correct positions are arranged in a pattern
      const correctX = (i % 3) * 30 + 5;
      const correctY = Math.floor(i / 3) * 30 + 5;
      
      newPieces.push({
        id: i,
        position: { x: randomX, y: randomY },
        correctPosition: { x: correctX, y: correctY },
        color: colors[i % colors.length],
        isPlaced: false,
        shape: shapes[i % shapes.length] as any
      });
    }
    
    setPieces(newPieces);
    setGameCompleted(false);
    setShowConfetti(false);
  }, [level]);
  
  // Check if the game is completed
  useEffect(() => {
    if (pieces.length > 0 && pieces.every(piece => piece.isPlaced)) {
      setGameCompleted(true);
      setShowConfetti(true);
      setMessage('Level Complete! +50 Gold');
      
      // Notify parent component with success and gold earned
      setTimeout(() => {
        onComplete(true, 50);
      }, 2000);
    }
  }, [pieces, onComplete]);
  
  const handlePieceSelect = (id: number) => {
    setSelectedPiece(id);
  };
  
  const handlePiecePlacement = (id: number) => {
    if (availableEnergy < energyRequired) {
      setMessage('Not enough energy!');
      setTimeout(() => setMessage(null), 2000);
      return;
    }
    
    // Use energy
    onEnergyUse(energyRequired);
    
    // Update piece position to correct position
    setPieces(prevPieces => 
      prevPieces.map(piece => 
        piece.id === id ? 
          { ...piece, position: piece.correctPosition, isPlaced: true } : 
          piece
      )
    );
    
    setSelectedPiece(null);
    setMessage(`Used ${energyRequired} energy`);
    setTimeout(() => setMessage(null), 1000);
  };
  
  const renderPieceShape = (shape: string, color: string) => {
    switch (shape) {
      case 'square':
        return <div className={`w-20 h-20 ${color} rounded-md`}></div>;
      case 'rectangle':
        return <div className={`w-30 h-15 ${color} rounded-md`}></div>;
      case 'lShape':
        return (
          <div className="relative">
            <div className={`w-15 h-15 ${color} rounded-md`}></div>
            <div className={`absolute top-0 left-15 w-15 h-30 ${color} rounded-md`}></div>
          </div>
        );
      case 'tShape':
        return (
          <div className="relative">
            <div className={`w-30 h-15 ${color} rounded-md`}></div>
            <div className={`absolute top-15 left-7.5 w-15 h-15 ${color} rounded-md`}></div>
          </div>
        );
      default:
        return <div className={`w-20 h-20 ${color} rounded-md`}></div>;
    }
  };
  
  return (
    <div className="relative w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden">
      {/* Game board */}
      <div className="absolute inset-0 bg-gray-200 border-4 border-gray-300 rounded-lg">
        {/* Grid lines for visual guidance */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0 pointer-events-none">
          {Array(16).fill(0).map((_, i) => (
            <div key={i} className="border border-gray-300 border-dashed"></div>
          ))}
        </div>
        
        {/* Target positions - shown as outlines */}
        {pieces.map(piece => (
          <div 
            key={`target-${piece.id}`}
            className="absolute border-2 border-dashed border-gray-500 rounded-md"
            style={{
              left: `${piece.correctPosition.x}%`,
              top: `${piece.correctPosition.y}%`,
              width: piece.shape === 'rectangle' ? '30%' : '20%',
              height: piece.shape === 'rectangle' ? '15%' : '20%',
              opacity: piece.isPlaced ? 0 : 0.5
            }}
          ></div>
        ))}
        
        {/* Block pieces */}
        {pieces.map(piece => (
          <div 
            key={piece.id}
            className={`absolute cursor-pointer transition-all duration-300 ${
              selectedPiece === piece.id ? 'ring-4 ring-white' : ''
            }`}
            style={{
              left: `${piece.position.x}%`,
              top: `${piece.position.y}%`,
              transform: 'translate(-10%, -10%)',
              zIndex: selectedPiece === piece.id ? 10 : 1
            }}
            onClick={() => !piece.isPlaced && handlePieceSelect(piece.id)}
          >
            {renderPieceShape(piece.shape, piece.color)}
          </div>
        ))}
      </div>
      
      {/* Energy and controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
          </svg>
          <span className="font-bold">{availableEnergy} Energy</span>
        </div>
        
        {selectedPiece !== null && (
          <button 
            className={`px-4 py-2 rounded-lg ${
              availableEnergy >= energyRequired 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-300 text-gray-500'
            }`}
            onClick={() => handlePiecePlacement(selectedPiece)}
            disabled={availableEnergy < energyRequired}
          >
            Place Block ({energyRequired} Energy)
          </button>
        )}
      </div>
      
      {/* Level indicator */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        Level {level}
      </div>
      
      {/* Message popup */}
      {message && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg text-lg font-bold">
          {message}
        </div>
      )}
      
      {/* Confetti overlay for completion */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {Array(50).fill(0).map((_, i) => {
            const size = Math.random() * 10 + 5;
            const color = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'][
              Math.floor(Math.random() * 5)
            ];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            
            return (
              <div
                key={i}
                className={`absolute ${color} rounded-full animate-fall`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: '-20px',
                  animationDuration: `${animationDuration}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            );
          })}
        </div>
      )}
      
      {/* Game completed overlay */}
      {gameCompleted && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-10">
          <div className="bg-white p-6 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Level Complete!</h2>
            <p className="text-lg text-gray-600 mb-4">You've mined this block successfully</p>
            <div className="flex justify-center space-x-4 mb-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
                <span className="font-bold">+50 Gold</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                </svg>
                <span className="font-bold">+10 Energy</span>
              </div>
            </div>
            <button 
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium"
              onClick={onComplete}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockGame;