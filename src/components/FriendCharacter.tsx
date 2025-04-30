
import React from 'react';
import { cn } from '@/lib/utils';

type FriendCharacterProps = {
  mood?: 'happy' | 'thinking' | 'excited';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
};

const FriendCharacter = ({
  mood = 'happy',
  size = 'md',
  className,
  onClick
}: FriendCharacterProps) => {
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
        className
      )}
      onClick={onClick}
    >
      <div className="w-full h-full rounded-full bg-kidpurple flex items-center justify-center animate-bounce-light">
        <div className="w-4/5 h-4/5 rounded-full bg-white flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-4 mb-2">
            <div className="w-4 h-4 rounded-full bg-black"></div>
            <div className="w-4 h-4 rounded-full bg-black"></div>
          </div>
          
          {/* Mouth - changes with mood */}
          {mood === 'happy' && (
            <div className="w-12 h-6 rounded-b-full border-b-4 border-l-4 border-r-4 border-black"></div>
          )}
          {mood === 'thinking' && (
            <div className="w-8 h-1 bg-black rounded-full"></div>
          )}
          {mood === 'excited' && (
            <div className="w-8 h-8 rounded-full border-4 border-black"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendCharacter;
