'use client';

import { useState } from 'react';
import { BookOpen, Settings, Home } from 'lucide-react';
import BountyBook from '@/components/BountyBook';
import ManageAnimes from '@/components/ManageAnimes';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'bounty' | 'manage'>('bounty');

  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      <main className="pb-20">
        <div hidden={activeTab !== 'bounty'}>
          <BountyBook />
        </div>
        <div hidden={activeTab !== 'manage'}>
          <ManageAnimes />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-800 to-amber-900 border-t border-amber-700 shadow-lg z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-around items-center py-2">
            <button
              onClick={() => setActiveTab('bounty')}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 ${
                activeTab === 'bounty'
                  ? 'bg-amber-700 text-white'
                  : 'text-amber-200 hover:text-white hover:bg-amber-700/50'
              }`}
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Bounty Book</span>
            </button>
            
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 ${
                activeTab === 'manage'
                  ? 'bg-amber-700 text-white'
                  : 'text-amber-200 hover:text-white hover:bg-amber-700/50'
              }`}
            >
              <Settings className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Manage</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}