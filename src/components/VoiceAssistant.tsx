import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceAssistantProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function VoiceAssistant({ isActive, onToggle, currentView, onNavigate }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const voiceCommands = {
    'go to recipes': () => onNavigate('recipe'),
    'start camera': () => onNavigate('scanner'),
    'show map': () => onNavigate('layout'),
    'accessibility settings': () => onNavigate('accessibility'),
    'go home': () => onNavigate('home'),
    'help': () => speak('I can help you navigate the store, generate recipes, scan products, and access accessibility features. Just say what you need!'),
    'what can you do': () => speak('I can help you with recipes, AR scanning, store navigation, and accessibility features. Try saying "go to recipes" or "start camera".'),
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      setResponse(text);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setResponse('');
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setTranscript(transcript);
        processCommand(transcript);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        speak('Sorry, I didn\'t catch that. Please try again.');
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      speak('Voice recognition is not supported in this browser.');
    }
  };

  const processCommand = (command: string) => {
    const matchedCommand = Object.keys(voiceCommands).find(cmd => 
      command.includes(cmd)
    );
    
    if (matchedCommand) {
      voiceCommands[matchedCommand as keyof typeof voiceCommands]();
    } else {
      speak('I didn\'t understand that command. Try saying "help" to see what I can do.');
    }
  };

  return (
    <>
      {/* Voice Assistant Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onToggle(!isActive)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg z-50 flex items-center justify-center transition-all ${
          isActive
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-600 hover:bg-gray-700'
        }`}
      >
        {isActive ? (
          <Volume2 className="w-8 h-8 text-white" />
        ) : (
          <VolumeX className="w-8 h-8 text-white" />
        )}
      </motion.button>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Voice Assistant</h3>
                  <p className="text-sm text-blue-100">Say a command or tap the mic</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={startListening}
                  disabled={isListening || isSpeaking}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-red-500 animate-pulse'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-6 h-6" />
                  ) : (
                    <Mic className="w-6 h-6" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Status */}
              <div className="text-center">
                {isListening && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center space-x-2 text-blue-600"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-sm font-medium">Listening...</span>
                  </motion.div>
                )}
                
                {isSpeaking && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center space-x-2 text-green-600"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Speaking...</span>
                  </motion.div>
                )}
              </div>

              {/* Transcript */}
              {transcript && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-900">
                    <span className="font-medium">You said:</span> "{transcript}"
                  </p>
                </div>
              )}

              {/* Response */}
              {response && (
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-green-900">
                    <span className="font-medium">Assistant:</span> {response}
                  </p>
                </div>
              )}

              {/* Quick Commands */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Quick Commands:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { text: 'Go to recipes', command: 'go to recipes' },
                    { text: 'Start camera', command: 'start camera' },
                    { text: 'Show map', command: 'show map' },
                    { text: 'Help', command: 'help' }
                  ].map((cmd) => (
                    <button
                      key={cmd.command}
                      onClick={() => processCommand(cmd.command)}
                      className="px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {cmd.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Context */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Current page:</span> {currentView}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}