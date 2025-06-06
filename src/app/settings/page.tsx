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

export default function Settings() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [notifications, setNotifications] = useState({
    energyRefill: true,
    friendActivity: true,
    dailyTasks: true,
    specialOffers: false,
  });
  const [gameSettings, setGameSettings] = useState({
    musicVolume: 70,
    sfxVolume: 80,
    vibration: true,
    darkMode: false,
    autoClaimEnergy: true,
    showTutorials: true,
  });

  useEffect(() => {
    const telegramUser = getTelegramUser();
    if (telegramUser) {
      initTelegramApp();
      setUser(telegramUser);
    }
  }, []);

  const handleNotificationToggle = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleGameSettingToggle = (setting: keyof typeof gameSettings) => {
    if (typeof gameSettings[setting] === 'boolean') {
      setGameSettings(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
    }
  };

  const handleVolumeChange = (setting: 'musicVolume' | 'sfxVolume', value: number) => {
    setGameSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // If no Telegram user data is available, render nothing
  if (!user) return null;

  // Only render the app if we have Telegram user data
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-[#2AABEE] to-[#229ED9] pb-16">
        <div className="w-full max-w-md">
          {/* Game Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Game Settings</h2>
            
            {/* Volume Controls */}
            <div className="mb-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-700">Music Volume</label>
                  <span className="text-sm text-gray-500">{gameSettings.musicVolume}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={gameSettings.musicVolume}
                  onChange={(e) => handleVolumeChange('musicVolume', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-gray-700">Sound Effects</label>
                  <span className="text-sm text-gray-500">{gameSettings.sfxVolume}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={gameSettings.sfxVolume}
                  onChange={(e) => handleVolumeChange('sfxVolume', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            {/* Toggle Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Vibration</h3>
                  <p className="text-xs text-gray-500">Vibrate on block placement</p>
                </div>
                <button 
                  onClick={() => handleGameSettingToggle('vibration')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                    gameSettings.vibration ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      gameSettings.vibration ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Dark Mode</h3>
                  <p className="text-xs text-gray-500">Use dark theme for gameplay</p>
                </div>
                <button 
                  onClick={() => handleGameSettingToggle('darkMode')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                    gameSettings.darkMode ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      gameSettings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Auto-Claim Energy</h3>
                  <p className="text-xs text-gray-500">Automatically claim energy when available</p>
                </div>
                <button 
                  onClick={() => handleGameSettingToggle('autoClaimEnergy')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                    gameSettings.autoClaimEnergy ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      gameSettings.autoClaimEnergy ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Show Tutorials</h3>
                  <p className="text-xs text-gray-500">Display helpful tips during gameplay</p>
                </div>
                <button 
                  onClick={() => handleGameSettingToggle('showTutorials')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                    gameSettings.showTutorials ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      gameSettings.showTutorials ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Energy Refill</h3>
                  <p className="text-xs text-gray-500">Get notified when energy is refilled</p>
                </div>
                <button 
                  onClick={() => handleNotificationToggle('energyRefill')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                    notifications.energyRefill ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      notifications.energyRefill ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Friend Activity</h3>
                  <p className="text-xs text-gray-500">Get notified about friend achievements</p>
                </div>
                <button 
                  onClick={() => handleNotificationToggle('friendActivity')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                    notifications.friendActivity ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      notifications.friendActivity ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Daily Tasks</h3>
                  <p className="text-xs text-gray-500">Get reminders about daily tasks</p>
                </div>
                <button 
                  onClick={() => handleNotificationToggle('dailyTasks')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                    notifications.dailyTasks ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      notifications.dailyTasks ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Special Offers</h3>
                  <p className="text-xs text-gray-500">Get notified about special deals</p>
                </div>
                <button 
                  onClick={() => handleNotificationToggle('specialOffers')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                    notifications.specialOffers ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span 
                    className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      notifications.specialOffers ? 'translate-x-6' : 'translate-x-1'
                    }`} 
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Support & About */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Support & About</h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Help & FAQ</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Contact Support</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">About Fun Block Mining</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium">Privacy Policy</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <div className="pt-2 text-center text-xs text-gray-500">
                <p>App Version: 1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation currentPath="/settings" />
    </>
  );
} 