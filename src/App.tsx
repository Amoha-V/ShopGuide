import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Navigation from './components/Navigation';
import RecipeGenerator from './components/RecipeGenerator';
import ARScanner from './components/ARScanner';
import StoreLayout from './components/StoreLayout';
import AccessibilityPanel from './components/AccessibilityPanel';
import VoiceAssistant from './components/VoiceAssistant';

type ActiveView = 'home' | 'recipe' | 'scanner' | 'layout' | 'accessibility';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const renderActiveView = () => {
    switch (activeView) {
      case 'recipe':
        return <RecipeGenerator onGenerateList={setShoppingList} />;
      case 'scanner':
        return <ARScanner shoppingList={shoppingList} />;
      case 'layout':
        return <StoreLayout shoppingList={shoppingList} />;
      case 'accessibility':
        return <AccessibilityPanel />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
            <div className="container mx-auto px-4 py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  Welcome to <span className="text-blue-600">ShopGuide</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Your inclusive shopping companion powered by AR, voice guidance, and smart recipes. 
                  Making Walmart shopping accessible and intelligent for everyone.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                  <FeatureCard
                    icon="🍳"
                    title="Smart Recipes"
                    description="Generate ingredient lists from any recipe with precise quantities"
                    onClick={() => setActiveView('recipe')}
                  />
                  <FeatureCard
                    icon="📱"
                    title="AR Scanner"
                    description="Scan products and get real-time AR navigation assistance"
                    onClick={() => setActiveView('scanner')}
                  />
                  <FeatureCard
                    icon="🗺️"
                    title="Store Layout"
                    description="Interactive store map with optimized shopping routes"
                    onClick={() => setActiveView('layout')}
                  />
                  <FeatureCard
                    icon="♿"
                    title="Accessibility"
                    description="Voice guidance, audio cues, and inclusive features"
                    onClick={() => setActiveView('accessibility')}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveView()}
        </motion.div>
      </AnimatePresence>

      <VoiceAssistant 
        isActive={isVoiceActive} 
        onToggle={setIsVoiceActive}
        currentView={activeView}
        onNavigate={setActiveView}
      />
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

function FeatureCard({ icon, title, description, onClick }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default App;