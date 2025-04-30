
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type FriendCharacterProps = {
  mood?: 'happy' | 'thinking' | 'excited' | 'waiting';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  animated?: boolean;
};

const FriendCharacter = ({
  mood = 'happy',
  size = 'md',
  className,
  onClick,
  animated = true
}: FriendCharacterProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentMood, setCurrentMood] = useState(mood);
  
  // Random blinking effect
  useEffect(() => {
    if (!animated) return;
    
    const blinkInterval = setInterval(() => {
      setCurrentMood('thinking');
      setTimeout(() => {
        setCurrentMood(mood);
      }, 200);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(blinkInterval);
  }, [mood, animated]);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  // Simple SVG character with different expressions based on mood
  return (
    <div 
      className={cn(
        sizeClasses[size], 
        'relative cursor-pointer transition-transform duration-300 hover:scale-105',
        animated && 'animate-bounce-light',
        className
      )}
      onClick={onClick}
    >
      <div className="w-full h-full rounded-full bg-kidpurple flex items-center justify-center">
        <div className="w-4/5 h-4/5 rounded-full bg-white flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-4 mb-2">
            {currentMood === 'thinking' ? (
              <>
                <div className="w-4 h-1 bg-black rounded-full mt-2"></div>
                <div className="w-4 h-1 bg-black rounded-full mt-2"></div>
              </>
            ) : (
              <>
                <div className="w-4 h-4 rounded-full bg-black"></div>
                <div className="w-4 h-4 rounded-full bg-black"></div>
              </>
            )}
          </div>
          
          {/* Mouth - changes with mood */}
          {currentMood === 'happy' && (
            <div className="w-12 h-6 rounded-b-full border-b-4 border-l-4 border-r-4 border-black"></div>
          )}
          {currentMood === 'thinking' && (
            <div className="w-8 h-1 bg-black rounded-full"></div>
          )}
          {currentMood === 'excited' && (
            <div className="w-8 h-8 rounded-full border-4 border-black"></div>
          )}
          {currentMood === 'waiting' && (
            <div className="w-10 h-1 bg-black rounded-full transform rotate-12"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendCharacter;
