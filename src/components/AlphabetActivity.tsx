
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type AlphabetActivityProps = {
  currentLetter: string;
  onCorrectAnswer: () => void;
  className?: string;
};

const AlphabetActivity = ({
  currentLetter,
  onCorrectAnswer,
  className
}: AlphabetActivityProps) => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  
  // Create letters array (first 6 letters for simplicity)
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  // Shuffle the letters to display in random order
  const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
  
  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    
    // If correct answer, call the callback after a short delay
    if (letter === currentLetter) {
      setTimeout(() => {
        onCorrectAnswer();
        setSelectedLetter(null);
      }, 1000);
    }
  };
  
  return (
    <div className={cn('p-4 rounded-3xl bg-white shadow-lg', className)}>
      <h2 className="text-2xl font-bold text-center mb-4">
        Find letter {currentLetter}
      </h2>
      
      <div className="grid grid-cols-3 gap-4">
        {shuffledLetters.map(letter => (
          <button
            key={letter}
            onClick={() => handleLetterSelect(letter)}
            className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-md',
              selectedLetter === letter && letter === currentLetter ? 'bg-kidorange text-white animate-bounce-light' : 
              selectedLetter === letter ? 'bg-kidred text-white' : 
              'bg-kidsoftyellow hover:bg-kidsoftgreen'
            )}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetActivity;
