import React, { useState } from 'react';
import { ChefHat, Users, Clock, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecipeGeneratorProps {
  onGenerateList: (items: any[]) => void;
}

export default function RecipeGenerator({ onGenerateList }: RecipeGeneratorProps) {
  const [recipeName, setRecipeName] = useState('');
  const [servings, setServings] = useState(4);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [generatedIngredients, setGeneratedIngredients] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Sodium'
  ];

  const sampleRecipes = [
    'Chicken Alfredo Pasta',
    'Beef Tacos',
    'Vegetable Stir Fry',
    'Chocolate Chip Cookies',
    'Caesar Salad',
    'Grilled Salmon'
  ];

  const generateIngredients = async () => {
    if (!recipeName.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call with realistic ingredients
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockIngredients = [
      {
        id: 1,
        name: 'Chicken Breast',
        quantity: `${servings * 0.5} lbs`,
        aisle: 'Meat & Seafood',
        price: '$8.99',
        location: 'Aisle 12',
        inStock: true
      },
      {
        id: 2,
        name: 'Heavy Cream',
        quantity: '1 cup',
        aisle: 'Dairy',
        price: '$3.49',
        location: 'Aisle 8',
        inStock: true
      },
      {
        id: 3,
        name: 'Fettuccine Pasta',
        quantity: '1 lb',
        aisle: 'Pasta & Rice',
        price: '$1.99',
        location: 'Aisle 5',
        inStock: true
      },
      {
        id: 4,
        name: 'Parmesan Cheese',
        quantity: '1 cup grated',
        aisle: 'Dairy',
        price: '$5.99',
        location: 'Aisle 8',
        inStock: false
      },
      {
        id: 5,
        name: 'Garlic',
        quantity: '3 cloves',
        aisle: 'Produce',
        price: '$0.99',
        location: 'Aisle 1',
        inStock: true
      }
    ];
    
    setGeneratedIngredients(mockIngredients);
    onGenerateList(mockIngredients);
    setIsGenerating(false);
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions(prev =>
      prev.includes(restriction)
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Smart Recipe Generator</h2>
              <p className="text-gray-600">Generate precise ingredient lists for any recipe</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Recipe Name
                </label>
                <input
                  type="text"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  placeholder="e.g., Chicken Alfredo Pasta"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-2">Popular recipes:</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleRecipes.map((recipe) => (
                      <button
                        key={recipe}
                        onClick={() => setRecipeName(recipe)}
                        className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
                      >
                        {recipe}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Number of Servings
                </label>
                <div className="flex items-center space-x-4">
                  <Users className="w-5 h-5 text-gray-400" />
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={servings}
                    onChange={(e) => setServings(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-lg font-semibold text-gray-900 w-8">{servings}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Dietary Restrictions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {dietaryOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleDietaryRestriction(option)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        dietaryRestrictions.includes(option)
                          ? 'bg-green-100 text-green-700 border-2 border-green-300'
                          : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateIngredients}
                disabled={!recipeName.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Ingredients...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Generate Shopping List</span>
                  </div>
                )}
              </motion.button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Generated Ingredients</h3>
              
              {generatedIngredients.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Enter a recipe name and click generate to see ingredients</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {generatedIngredients.map((ingredient) => (
                    <motion.div
                      key={ingredient.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-xl border-2 ${
                        ingredient.inStock
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{ingredient.name}</h4>
                          <p className="text-sm text-gray-600">{ingredient.quantity}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-blue-600">{ingredient.location}</span>
                            <span className="text-sm font-semibold text-green-600">{ingredient.price}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ingredient.inStock
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {ingredient.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}