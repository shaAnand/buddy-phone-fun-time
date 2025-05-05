import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type NumberActivityProps = {
  currentNumber: number;
  onCorrectAnswer: () => void;
  className?: string;
};

const NumberActivity = ({
  currentNumber,
  onCorrectAnswer,
  className
}: NumberActivityProps) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const isMobile = useIsMobile();
  
  // Create an array of numbers 1-10 for the child to choose from
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  
  // Shuffle the numbers but ensure we show 6 options including the correct one
  // For numbers > 6, we'll always include numbers close to the target
  const getShuffledOptions = () => {
    // If the current number is > 6, we'll include some numbers around it
    const additionalOptions = [];
    if (currentNumber > 6) {
      // Include some numbers close to the target number
      const lowerBound = Math.max(1, currentNumber - 2);
      const upperBound = Math.min(10, currentNumber + 2);
      
      for (let i = lowerBound; i <= upperBound; i++) {
        if (i !== currentNumber) {
          additionalOptions.push(i);
        }
      }
    }
    
    // Shuffle all numbers
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);
    
    // First, get 6 random numbers
    let selectedOptions = shuffled.slice(0, 6);
    
    // Make sure the current number is included
    if (!selectedOptions.includes(currentNumber)) {
      const randomIndex = Math.floor(Math.random() * 6);
      selectedOptions[randomIndex] = currentNumber;
    }
    
    // For higher numbers, ensure we have some numbers close to the target
    if (currentNumber > 6) {
      // Replace some random options with numbers close to the target
      const optionsToAdd = Math.min(2, additionalOptions.length);
      for (let i = 0; i < optionsToAdd; i++) {
        if (i < additionalOptions.length) {
          // Only replace if the option is not already the target number
          const indexToReplace = selectedOptions.findIndex(n => n !== currentNumber);
          if (indexToReplace !== -1) {
            selectedOptions[indexToReplace] = additionalOptions[i];
          }
        }
      }
    }
    
    return selectedOptions;
  };
  
  const shuffledNumbers = getShuffledOptions();
  
  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
    
    // If correct answer, call the callback after a short delay
    if (number === currentNumber) {
      setTimeout(() => {
        onCorrectAnswer();
        setSelectedNumber(null);
        setShowHint(false);
      }, 1000);
    } else {
      // If wrong answer, show a hint after a few attempts
      setTimeout(() => {
        setSelectedNumber(null);
        setShowHint(true);
      }, 1000);
    }
  };

  // After a few seconds of no activity, show a subtle hint
  React.useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowHint(true);
    }, 5000);
    
    return () => clearTimeout(hintTimer);
  }, [currentNumber]);
  
  return (
    <div className={cn('p-3 sm:p-4 rounded-3xl bg-white shadow-lg', className)}>
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">
        Find number {currentNumber}
      </h2>
      
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {shuffledNumbers.map(number => {
          const isCurrentNumber = number === currentNumber;
          const isSelected = selectedNumber === number;
          const shouldPulse = showHint && isCurrentNumber;
          
          return (
            <button
              key={number}
              onClick={() => handleNumberSelect(number)}
              className={cn(
                'w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-md',
                isSelected && isCurrentNumber ? 'bg-kidblue text-white animate-bounce-light' : 
                isSelected ? 'bg-kidred text-white' : 
                'bg-kidsoftgreen hover:bg-kidsoftyellow',
                shouldPulse && 'animate-pulse-ring'
              )}
            >
              {number}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NumberActivity;
