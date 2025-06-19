import React from 'react';
import { ShoppingCart, Accessibility, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ShopGuide</h1>
              <p className="text-sm text-gray-500">Powered by AI</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
              title="Accessibility Features"
            >
              <Accessibility className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              title="Voice Assistant"
            >
              <Volume2 className="w-5 h-5" />
            </motion.button>
            
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900">
              W
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}