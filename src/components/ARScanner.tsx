import React, { useState, useRef, useEffect } from 'react';
import { Camera, Scan, Navigation, ShoppingCart, Volume2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface ARScannerProps {
  shoppingList: any[];
}

export default function ARScanner({ shoppingList }: ARScannerProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scannedItem, setScannedItem] = useState<any>(null);
  const [arOverlays, setArOverlays] = useState<any[]>([]);
  const [isVoiceGuidanceOn, setIsVoiceGuidanceOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isCameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => stopCamera();
  }, [isCameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      // Simulate AR detection
      setTimeout(() => {
        simulateARDetection();
      }, 3000);
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const simulateARDetection = () => {
    // Simulate detecting products and showing AR overlays
    const mockDetections = [
      {
        id: 1,
        name: 'Chicken Breast',
        position: { x: 150, y: 200 },
        distance: '12 feet',
        direction: 'Turn left, Aisle 12',
        inList: true
      },
      {
        id: 2,
        name: 'Pasta Sauce',
        position: { x: 300, y: 150 },
        distance: '8 feet',
        direction: 'Straight ahead, Aisle 5',
        inList: false
      }
    ];
    
    setArOverlays(mockDetections);
    
    if (isVoiceGuidanceOn) {
      speakGuidance('I found Chicken Breast on your list. Turn left to Aisle 12, about 12 feet away.');
    }
  };

  const speakGuidance = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleItemScan = (item: any) => {
    setScannedItem(item);
    if (isVoiceGuidanceOn) {
      speakGuidance(`Found ${item.name}. ${item.inList ? 'This item is on your shopping list.' : 'This item is not on your current list.'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Camera className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">AR Scanner</h2>
                  <p className="text-blue-100">Scan products for real-time navigation</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsVoiceGuidanceOn(!isVoiceGuidanceOn)}
                  className={`p-3 rounded-xl transition-all ${
                    isVoiceGuidanceOn ? 'bg-white/20' : 'bg-white/10'
                  }`}
                  title="Toggle Voice Guidance"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setIsCameraActive(!isCameraActive)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    isCameraActive
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isCameraActive ? 'Stop Camera' : 'Start Camera'}
                </button>
              </div>
            </div>
          </div>

          {/* Camera View */}
          <div className="relative bg-black" style={{ height: '500px' }}>
            {isCameraActive ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
                
                {/* AR Overlays */}
                {arOverlays.map((overlay) => (
                  <motion.div
                    key={overlay.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute cursor-pointer"
                    style={{
                      left: overlay.position.x,
                      top: overlay.position.y,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => handleItemScan(overlay)}
                  >
                    <div className={`bg-white rounded-lg p-3 shadow-lg border-2 ${
                      overlay.inList ? 'border-green-400' : 'border-blue-400'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          overlay.inList ? 'bg-green-400' : 'bg-blue-400'
                        }`}></div>
                        <span className="font-semibold text-sm">{overlay.name}</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        <div>{overlay.distance}</div>
                        <div>{overlay.direction}</div>
                      </div>
                    </div>
                    
                    {/* Pulsing indicator */}
                    <div className={`absolute inset-0 rounded-lg border-2 ${
                      overlay.inList ? 'border-green-400' : 'border-blue-400'
                    } animate-ping opacity-75`}></div>
                  </motion.div>
                ))}
                
                {/* Scanning indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 border-2 border-white/50 rounded-lg">
                    <div className="w-full h-full border-2 border-blue-400 rounded-lg animate-pulse">
                      <Scan className="w-8 h-8 text-blue-400 absolute top-2 left-2" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Camera Not Active</h3>
                  <p className="text-gray-400">Click "Start Camera" to begin AR scanning</p>
                </div>
              </div>
            )}
          </div>

          {/* Controls and Info */}
          <div className="p-6 bg-gray-50">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Shopping List Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Shopping List Status</h3>
                <div className="space-y-2">
                  {shoppingList.length > 0 ? (
                    shoppingList.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.location}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No items in shopping list. Generate a recipe first!</p>
                  )}
                </div>
              </div>

              {/* Scanned Item Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Scanned Item</h3>
                {scannedItem ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-4 rounded-lg border-2 ${
                      scannedItem.inList ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900">{scannedItem.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{scannedItem.direction}</p>
                    <p className="text-sm text-gray-600">Distance: {scannedItem.distance}</p>
                    <div className="mt-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        scannedItem.inList
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {scannedItem.inList ? '✓ On your list' : 'Not on your list'}
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
                    <p className="text-gray-500">Point camera at products to scan</p>
                  </div>
                )}
              </div>
            </div>

            {/* Accessibility Features */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Accessibility Features Active</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Voice Guidance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>High Contrast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Large Text</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Audio Cues</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}