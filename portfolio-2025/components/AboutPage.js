"use client";

import React, { useState } from "react";
import Image from "next/image";

const resumeImage = "/images/ChouBokYann_CV.jpg"; // You'll need to add your resume image

export default function AboutPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm here to help you learn more about Bok Yann.", sender: "bot", timestamp: "10:30 AM" },
    { id: 2, text: "What would you like to know about his background?", sender: "bot", timestamp: "10:30 AM" },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "That's interesting! Tell me more about that.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#454545] py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left side - Resume Image */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative">
            <div className="animate-bounce-slow animate-rotate-slow">
              <Image 
                src={resumeImage} 
                alt="Resume" 
                width={400} 
                height={600}
                className="w-full h-auto max-w-sm shadow-2xl rounded-lg blur-[1.5px]"
              />
            </div>
          </div>
        </div>

        {/* Right side - Chat Interface */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 h-[600px] flex flex-col">

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#FF6000] text-[#FFE6C7]'
                      : 'bg-[#FFA559] text-[#454545]'
                  }`}
                >
                  <p className="text-sm font-body">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg border-2 border-[#FF6000] focus:outline-none focus:border-[#FFA559] bg-white text-[#454545] font-body"
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-[#FF6000] hover:bg-[#FFA559] text-[#FFE6C7] rounded-lg transition-colors duration-200"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
