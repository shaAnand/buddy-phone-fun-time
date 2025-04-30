
import React, { useState, useEffect } from 'react';
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
  const [showHint, setShowHint] = useState(false);
  
  // Create letters array (first 6 letters for simplicity)
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  
  // Shuffle the letters but ensure we only show 6 options including the correct one
  const getShuffledOptions = () => {
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    // Make sure the current letter is included
    if (!shuffled.slice(0, 6).includes(currentLetter)) {
      const randomIndex = Math.floor(Math.random() * 6);
      shuffled[randomIndex] = currentLetter;
    }
    return shuffled.slice(0, 6);
  };
  
  const shuffledLetters = getShuffledOptions();
  
  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    
    // If correct answer, call the callback after a short delay
    if (letter === currentLetter) {
      setTimeout(() => {
        onCorrectAnswer();
        setSelectedLetter(null);
        setShowHint(false);
      }, 1000);
    } else {
      // If wrong answer, clear selection after a moment
      setTimeout(() => {
        setSelectedLetter(null);
        setShowHint(true);
      }, 1000);
    }
  };
  
  // After a few seconds of no activity, show a subtle hint
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowHint(true);
    }, 5000);
    
    return () => clearTimeout(hintTimer);
  }, [currentLetter]);
  
  // Get visual examples for letters
  const getLetterExample = (letter: string) => {
    const examples: Record<string, string> = {
      'A': '🍎', // Apple
      'B': '🐻', // Bear
      'C': '🐱', // Cat
      'D': '🐶', // Dog
      'E': '🐘', // Elephant
      'F': '🐟', // Fish
      'G': '🦒', // Giraffe
      'H': '🏠', // House
      'I': '🍦', // Ice cream
      'J': '🤹‍♂️', // Juggler
    };
    
    return examples[letter] || '';
  };
  
  return (
    <div className={cn('p-4 rounded-3xl bg-white shadow-lg', className)}>
      <h2 className="text-2xl font-bold text-center mb-2">
        Find letter {currentLetter}
      </h2>
      
      {showHint && (
        <div className="text-center mb-2">
          <p className="text-xl">{currentLetter} is for {getLetterExample(currentLetter)}</p>
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-4">
        {shuffledLetters.map(letter => {
          const isCurrentLetter = letter === currentLetter;
          const isSelected = selectedLetter === letter;
          const shouldPulse = showHint && isCurrentLetter;
          
          return (
            <button
              key={letter}
              onClick={() => handleLetterSelect(letter)}
              className={cn(
                'w-20 h-20 rounded-full flex flex-col items-center justify-center text-3xl font-bold shadow-md',
                isSelected && isCurrentLetter ? 'bg-kidorange text-white animate-bounce-light' : 
                isSelected ? 'bg-kidred text-white' : 
                'bg-kidsoftyellow hover:bg-kidsoftgreen',
                shouldPulse && 'animate-pulse-ring'
              )}
            >
              <span>{letter}</span>
              {showHint && letter === currentLetter && (
                <span className="text-lg">{getLetterExample(letter)}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AlphabetActivity;
