import React, { useState } from 'react';
import { Accessibility, Volume2, Eye, Hand, Type, Contrast } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccessibilityPanel() {
  const [settings, setSettings] = useState({
    voiceGuidance: true,
    highContrast: false,
    largeText: false,
    hapticFeedback: true,
    audioDescriptions: true,
    slowMotion: false,
    colorBlindSupport: false,
    screenReader: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const accessibilityFeatures = [
    {
      id: 'voiceGuidance',
      icon: Volume2,
      title: 'Voice Guidance',
      description: 'Audio directions and product information',
      category: 'Audio'
    },
    {
      id: 'audioDescriptions',
      icon: Volume2,
      title: 'Audio Descriptions',
      description: 'Detailed audio descriptions of visual elements',
      category: 'Audio'
    },
    {
      id: 'highContrast',
      icon: Contrast,
      title: 'High Contrast Mode',
      description: 'Enhanced visual contrast for better visibility',
      category: 'Visual'
    },
    {
      id: 'largeText',
      icon: Type,
      title: 'Large Text',
      description: 'Increased font size throughout the app',
      category: 'Visual'
    },
    {
      id: 'colorBlindSupport',
      icon: Eye,
      title: 'Color Blind Support',
      description: 'Alternative color schemes and patterns',
      category: 'Visual'
    },
    {
      id: 'hapticFeedback',
      icon: Hand,
      title: 'Haptic Feedback',
      description: 'Vibration cues for navigation and confirmations',
      category: 'Touch'
    },
    {
      id: 'slowMotion',
      icon: Hand,
      title: 'Slow Motion Interface',
      description: 'Reduced animation speed for motor difficulties',
      category: 'Motor'
    },
    {
      id: 'screenReader',
      icon: Eye,
      title: 'Screen Reader Support',
      description: 'Enhanced compatibility with screen readers',
      category: 'Audio'
    }
  ];

  const categories = ['Audio', 'Visual', 'Touch', 'Motor'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Accessibility className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Accessibility Settings</h2>
              <p className="text-gray-600">Customize your shopping experience for your needs</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-green-50 border-2 border-green-200 rounded-xl text-left hover:bg-green-100 transition-all"
            >
              <h3 className="font-semibold text-green-900 mb-1">Visual Impairment</h3>
              <p className="text-sm text-green-700">Enable voice guidance, audio cues, and screen reader support</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-left hover:bg-blue-100 transition-all"
            >
              <h3 className="font-semibold text-blue-900 mb-1">Hearing Impairment</h3>
              <p className="text-sm text-blue-700">Enable visual cues, haptic feedback, and text alternatives</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 bg-orange-50 border-2 border-orange-200 rounded-xl text-left hover:bg-orange-100 transition-all"
            >
              <h3 className="font-semibold text-orange-900 mb-1">Motor Impairment</h3>
              <p className="text-sm text-orange-700">Enable voice control, larger touch targets, and slower animations</p>
            </motion.button>
          </div>

          {/* Feature Categories */}
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{category} Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {accessibilityFeatures
                  .filter(feature => feature.category === category)
                  .map((feature) => {
                    const Icon = feature.icon;
                    const isEnabled = settings[feature.id as keyof typeof settings];
                    
                    return (
                      <motion.div
                        key={feature.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          isEnabled
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                        }`}
                        onClick={() => toggleSetting(feature.id as keyof typeof settings)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${
                              isEnabled ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                              <Icon className={`w-5 h-5 ${
                                isEnabled ? 'text-green-600' : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                          <div className={`w-12 h-6 rounded-full transition-all ${
                            isEnabled ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all transform ${
                              isEnabled ? 'translate-x-6' : 'translate-x-0.5'
                            } mt-0.5`}></div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* Voice Commands */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Voice Commands</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Navigation</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>"Go to recipes"</li>
                  <li>"Start camera scanner"</li>
                  <li>"Show store map"</li>
                  <li>"Find [product name]"</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Shopping</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>"Add to shopping list"</li>
                  <li>"Read shopping list"</li>
                  <li>"Navigate to checkout"</li>
                  <li>"Help me find [item]"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Emergency Features */}
          <div className="mt-8 bg-red-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-900 mb-4">Emergency & Assistance</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-red-100 border-2 border-red-200 rounded-lg text-left hover:bg-red-200 transition-all"
              >
                <h4 className="font-semibold text-red-900 mb-1">Call for Assistance</h4>
                <p className="text-sm text-red-700">Request help from store staff</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-red-100 border-2 border-red-200 rounded-lg text-left hover:bg-red-200 transition-all"
              >
                <h4 className="font-semibold text-red-900 mb-1">Emergency Contact</h4>
                <p className="text-sm text-red-700">Quick access to emergency services</p>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}