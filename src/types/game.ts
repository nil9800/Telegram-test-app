export interface GameState {
  level: number;
  energy: number;
  maxEnergy: number;
  mainCurrency: number;
  experience: number;
  blocksCompleted: number;
  blocksRequired: number;
}

export interface PuzzlePiece {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isPlaced: boolean;
  energyCost: number;
}

export interface Block {
  id: string;
  pieces: PuzzlePiece[];
  isCompleted: boolean;
  reward: {
    mainCurrency: number;
    energy: number;
    experience: number;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'watch_ad' | 'daily_login' | 'invite_friend' | 'complete_level' | 'special';
  reward: {
    energy?: number;
    mainCurrency?: number;
    maxEnergyIncrease?: number;
  };
  isCompleted: boolean;
  cooldownHours?: number;
  lastCompleted?: Date;
}

export interface Player {
  id: string;
  username: string;
  level: number;
  mainCurrency: number;
  rank: number;
}

export interface SurpriseReward {
  type: 'energy' | 'main_currency' | 'nft' | 'ton' | 'energy_slot';
  amount: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}