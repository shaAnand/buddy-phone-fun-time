
import React from 'react';
import { Button } from '@/components/ui/button';

type CallDialogCompleteProps = {
  onHangup: () => void;
  onPlayAgain: () => void;
  activityType: 'numbers' | 'alphabet';
};

const CallDialogComplete = ({ onHangup, onPlayAgain, activityType }: CallDialogCompleteProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 sm:gap-3">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div 
            key={idx} 
            className="text-xl sm:text-2xl animate-bounce-light" 
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            ⭐
          </div>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Button
          onClick={onHangup}
          className="bg-kidblue text-white rounded-full px-4 sm:px-6 py-1 sm:py-2"
        >
          Bye bye!
        </Button>
        
        <Button
          onClick={onPlayAgain}
          className="bg-kidgreen text-white rounded-full px-4 sm:px-6 py-1 sm:py-2"
        >
          Play again!
        </Button>
      </div>
    </div>
  );
};

export default CallDialogComplete;
