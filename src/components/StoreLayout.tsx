import React, { useState } from 'react';
import { Map, Navigation, Clock, Route, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface StoreLayoutProps {
  shoppingList: any[];
}

export default function StoreLayout({ shoppingList }: StoreLayoutProps) {
  const [selectedRoute, setSelectedRoute] = useState<'optimal' | 'accessible' | 'express'>('optimal');
  const [currentLocation, setCurrentLocation] = useState({ x: 50, y: 400 });

  const storeAisles = [
    { id: 1, name: 'Produce', x: 100, y: 100, width: 150, height: 80, color: 'bg-green-200' },
    { id: 2, name: 'Dairy', x: 300, y: 100, width: 120, height: 80, color: 'bg-blue-200' },
    { id: 3, name: 'Meat & Seafood', x: 500, y: 100, width: 140, height: 80, color: 'bg-red-200' },
    { id: 4, name: 'Bakery', x: 100, y: 220, width: 120, height: 80, color: 'bg-yellow-200' },
    { id: 5, name: 'Pasta & Rice', x: 300, y: 220, width: 120, height: 80, color: 'bg-orange-200' },
    { id: 6, name: 'Frozen Foods', x: 500, y: 220, width: 140, height: 80, color: 'bg-cyan-200' },
    { id: 7, name: 'Beverages', x: 100, y: 340, width: 120, height: 80, color: 'bg-purple-200' },
    { id: 8, name: 'Snacks', x: 300, y: 340, width: 120, height: 80, color: 'bg-pink-200' },
    { id: 9, name: 'Health & Beauty', x: 500, y: 340, width: 140, height: 80, color: 'bg-indigo-200' },
  ];

  const routeOptions = [
    {
      id: 'optimal',
      name: 'Optimal Route',
      description: 'Shortest path through all items',
      time: '12 min',
      distance: '0.3 miles'
    },
    {
      id: 'accessible',
      name: 'Accessible Route',
      description: 'Wide aisles, ramps, accessible features',
      time: '15 min',
      distance: '0.4 miles'
    },
    {
      id: 'express',
      name: 'Express Route',
      description: 'Skip crowded areas, fastest checkout',
      time: '8 min',
      distance: '0.2 miles'
    }
  ];

  const getOptimalPath = () => {
    if (shoppingList.length === 0) return [];
    
    // Simulate optimal path calculation
    const path = [
      { x: 50, y: 400 }, // Start (entrance)
      { x: 150, y: 140 }, // Produce
      { x: 360, y: 140 }, // Dairy
      { x: 570, y: 140 }, // Meat
      { x: 360, y: 260 }, // Pasta
      { x: 50, y: 450 }, // Checkout
    ];
    
    return path;
  };

  const pathPoints = getOptimalPath();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <Map className="w-8 h-8" />
              <div>
                <h2 className="text-3xl font-bold">Interactive Store Map</h2>
                <p className="text-blue-100">Navigate with optimized routes and real-time guidance</p>
              </div>
            </div>
            
            {/* Route Selection */}
            <div className="grid md:grid-cols-3 gap-4">
              {routeOptions.map((route) => (
                <motion.button
                  key={route.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRoute(route.id as any)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedRoute === route.id
                      ? 'bg-white text-gray-900 shadow-lg'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <h3 className="font-semibold mb-1">{route.name}</h3>
                  <p className={`text-sm mb-2 ${
                    selectedRoute === route.id ? 'text-gray-600' : 'text-blue-100'
                  }`}>
                    {route.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{route.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Route className="w-4 h-4" />
                      <span>{route.distance}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Store Map */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-xl p-4 relative overflow-hidden" style={{ height: '500px' }}>
                  <svg
                    viewBox="0 0 700 500"
                    className="w-full h-full"
                  >
                    {/* Store Layout */}
                    {storeAisles.map((aisle) => (
                      <g key={aisle.id}>
                        <rect
                          x={aisle.x}
                          y={aisle.y}
                          width={aisle.width}
                          height={aisle.height}
                          className={`${aisle.color} stroke-gray-300 stroke-2`}
                          rx="8"
                        />
                        <text
                          x={aisle.x + aisle.width / 2}
                          y={aisle.y + aisle.height / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-sm font-semibold fill-gray-700"
                        >
                          {aisle.name}
                        </text>
                      </g>
                    ))}

                    {/* Optimal Path */}
                    {pathPoints.length > 1 && (
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d={`M ${pathPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
                        stroke="#3B82F6"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="10,5"
                        className="drop-shadow-sm"
                      />
                    )}

                    {/* Path Points */}
                    {pathPoints.map((point, index) => (
                      <motion.circle
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.3 }}
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        className={`${
                          index === 0 ? 'fill-green-500' : 
                          index === pathPoints.length - 1 ? 'fill-red-500' : 
                          'fill-blue-500'
                        } stroke-white stroke-2`}
                      />
                    ))}

                    {/* Current Location */}
                    <motion.circle
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      cx={currentLocation.x}
                      cy={currentLocation.y}
                      r="12"
                      className="fill-yellow-400 stroke-yellow-600 stroke-2"
                    />

                    {/* Entrance/Exit */}
                    <rect x="20" y="380" width="60" height="40" className="fill-gray-300 stroke-gray-400 stroke-2" rx="4" />
                    <text x="50" y="405" textAnchor="middle" className="text-xs font-semibold fill-gray-600">
                      Entrance
                    </text>

                    {/* Checkout */}
                    <rect x="20" y="440" width="60" height="40" className="fill-blue-300 stroke-blue-400 stroke-2" rx="4" />
                    <text x="50" y="465" textAnchor="middle" className="text-xs font-semibold fill-blue-700">
                      Checkout
                    </text>
                  </svg>

                  {/* Legend */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                    <h4 className="font-semibold text-sm mb-2">Legend</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Start</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Stop</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Checkout</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span>You are here</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shopping List & Navigation */}
              <div className="space-y-6">
                {/* Current Navigation */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Navigation className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Next Direction</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-blue-800 font-medium">Head to Produce Section</p>
                    <p className="text-blue-600 text-sm">Turn right and walk 50 feet</p>
                    <div className="flex items-center space-x-4 text-sm text-blue-600">
                      <span>Distance: 50 ft</span>
                      <span>ETA: 1 min</span>
                    </div>
                  </div>
                </div>

                {/* Shopping List Progress */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Shopping Progress</h3>
                  {shoppingList.length > 0 ? (
                    <div className="space-y-3">
                      {shoppingList.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center">
                              {index < 2 && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.location}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            index < 2 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {index < 2 ? 'Found' : 'Pending'}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No items in shopping list</p>
                  )}
                </div>

                {/* Accessibility Features */}
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-semibold text-green-900 mb-3">Accessibility Active</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Wide aisle routing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Audio navigation cues</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Elevator access points</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Rest area locations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}