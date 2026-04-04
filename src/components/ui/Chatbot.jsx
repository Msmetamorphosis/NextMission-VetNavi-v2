'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import { sendChatMessage } from '@/lib/api-client';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your NextMission AI assistant. How can I help you navigate your transition today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    const newMessages = [
      ...messages,
      { type: 'user', content: userMessage }
    ];

    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      // Convert messages to the format expected by Claude API
      const conversationHistory = newMessages
        .slice(1) // Skip the initial bot message
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));

      const response = await sendChatMessage(userMessage, conversationHistory);
      
      setMessages(prev => [
        ...prev,
        { type: 'bot', content: response.message }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        { 
          type: 'bot', 
          content: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment, or feel free to explore our resources page for immediate assistance.' 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice recognition - in production, integrate with Web Speech API
      setTimeout(() => {
        setInputValue('I need help finding a job in cybersecurity');
        setIsListening(false);
      }, 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center"
          style={{ backgroundColor: 'var(--olive-green)' }}
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t-xl"
               style={{ backgroundColor: 'var(--navy)' }}>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white font-semibold">NextMission AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-[var(--olive-green)] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message or use voice..."
                  className="w-full p-3 pr-12 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[var(--olive-green)] focus:border-transparent"
                  rows="1"
                  disabled={isTyping}
                />
                <button
                  onClick={toggleVoice}
                  className={`absolute right-2 top-2 p-2 rounded ${
                    isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  } hover:bg-gray-200 transition-colors duration-200`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="p-3 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
                style={{ backgroundColor: 'var(--olive-green)' }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {isListening && (
              <div className="flex items-center justify-center mt-2 text-red-600">
                <div className="animate-pulse flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Listening...</span>
                </div>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              Try: {'"'}Help me find a job{'"'} or {'"'}Create an action plan{'"'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}