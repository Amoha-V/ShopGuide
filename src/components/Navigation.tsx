import React from 'react';
import { Home, ChefHat, Camera, Map, Accessibility } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: any) => void;
}

export default function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'recipe', icon: ChefHat, label: 'Recipes' },
    { id: 'scanner', icon: Camera, label: 'AR Scanner' },
    { id: 'layout', icon: Map, label: 'Store Map' },
    { id: 'accessibility', icon: Accessibility, label: 'Accessibility' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}