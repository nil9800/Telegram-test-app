'use client';

import { Home, ListTodo, Trophy } from 'lucide-react'

interface BottomNavigationProps {
  currentView: 'game' | 'tasks' | 'leaderboard'
  setCurrentView: (view: 'game' | 'tasks' | 'leaderboard') => void
}

export function BottomNavigation({ currentView, setCurrentView }: BottomNavigationProps) {
  const navItems = [
    { id: 'game', label: 'Game', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: ListTodo },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
  ] as const

  return (
    <nav className="bg-gradient-to-r from-[#1a1a3a] to-[#2d2d5a] border-t border-gray-700 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200 ${
              currentView === id
                ? 'bg-gradient-to-t from-purple-600 to-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}