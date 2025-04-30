
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

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
  
  // Create an array of numbers 1-10 for the child to choose from
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  
  // Shuffle the numbers to display in random order
  const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
  
  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
    
    // If correct answer, call the callback after a short delay
    if (number === currentNumber) {
      setTimeout(() => {
        onCorrectAnswer();
        setSelectedNumber(null);
      }, 1000);
    }
  };
  
  return (
    <div className={cn('p-4 rounded-3xl bg-white shadow-lg', className)}>
      <h2 className="text-2xl font-bold text-center mb-4">
        Find number {currentNumber}
      </h2>
      
      <div className="grid grid-cols-3 gap-4">
        {shuffledNumbers.map(number => (
          <button
            key={number}
            onClick={() => handleNumberSelect(number)}
            className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold shadow-md',
              selectedNumber === number && number === currentNumber ? 'bg-kidblue text-white animate-bounce-light' : 
              selectedNumber === number ? 'bg-kidred text-white' : 
              'bg-kidsoftgreen hover:bg-kidsoftyellow'
            )}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberActivity;
