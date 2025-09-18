"use client";

import React, { useState, useEffect } from 'react';
import { FiMail, FiLinkedin } from 'react-icons/fi';
import { Megaphone } from 'lucide-react'; // Import a new icon
import notificationsData from '@/data/notifications.json';

const TYPING_SPEED = 70;
const PAUSE_DURATION = 3000;

export function NotificationBar() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // This logic correctly uses your JSON file and remains unchanged
    const messages = notificationsData;
    if (messages.length === 0) return;
    const currentMessageText = messages[currentMessageIndex].text;

    if (isTyping) {
      if (displayedText.length < currentMessageText.length) {
        const typingTimer = setTimeout(() => {
          setDisplayedText(currentMessageText.substring(0, displayedText.length + 1));
        }, TYPING_SPEED);
        return () => clearTimeout(typingTimer);
      } else {
        const pauseTimer = setTimeout(() => {
          setIsTyping(false);
        }, PAUSE_DURATION);
        return () => clearTimeout(pauseTimer);
      }
    } else {
      const resetTimer = setTimeout(() => {
        setDisplayedText('');
        setIsTyping(true);
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 500);
      return () => clearTimeout(resetTimer);
    }
  }, [currentMessageIndex, displayedText, isTyping]);

  return (
    // --- UPDATED COLORS AND STYLING ---
    <div className="bg-slate-950 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),rgba(255,255,255,0))] backdrop-blur-lg border-b border-slate-800 text-cyan-200 py-2 px-6 flex items-center justify-between text-sm md:text-base font-medium z-40 relative">
      <div className="flex-grow flex items-center overflow-hidden whitespace-nowrap">
        {/* Replaced emoji with a premium icon */}
        •<Megaphone className="h-5 w-5 mr-3 flex-shrink-0 text-cyan-400" />
        <span className="overflow-hidden text-ellipsis">{displayedText}</span>
      </div>

      <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
        <a
          href="mailto:jose@iitbhilai.ac.in" // Updated email
          className="text-slate-300 hover:text-cyan-400 transition-colors duration-200"
          aria-label="Email"
        >
          <FiMail className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/company/amdcg-iitbhilai/" // Replace with your Twitter link
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-300 hover:text-cyan-400 transition-colors duration-200"
          aria-label="Twitter"
        >
          <FiLinkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}