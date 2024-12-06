import React from 'react';
import { Code2, Eye } from 'lucide-react';

interface TabViewProps {
  activeTab: 'code' | 'preview' | 'LUA';
  onTabChange: (tab: 'code' | 'preview' |'LUA') => void;
}

export function TabView({ activeTab, onTabChange }: TabViewProps) {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => onTabChange('code')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          activeTab === 'code'
            ? 'bg-gray-700 text-gray-100'
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
        }`}
      >
        <Code2 className="w-4 h-4" />
        Code
      </button>

      <button
        onClick={() => onTabChange('preview')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          activeTab === 'preview'
            ? 'bg-gray-700 text-gray-100'
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
        }`}
      >
        <Eye className="w-4 h-4" />
        Preview
      </button>


      <button
        onClick={() => onTabChange('LUA')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          activeTab === 'LUA'
            ? 'bg-gray-700 text-gray-100'
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
        }`}
      >
        <Code2 className="w-4 h-4" />
        Chat
      </button>
    </div>
  );
}